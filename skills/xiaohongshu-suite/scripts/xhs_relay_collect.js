#!/usr/bin/env node
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");

function parseArgs(argv) {
  const args = {
    keyword: "",
    limit: 20,
    outputCsv: "",
    outputReport: "",
    detailLimit: 0,
    cdpUrl: "http://127.0.0.1:18792",
    openclawDir: path.join(os.homedir(), ".openclaw"),
    playwrightRoot:
      process.env.OPENCLAW_PLAYWRIGHT_ROOT ||
      "E:/ClawX/resources/openclaw/node_modules/playwright-core",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--keyword" && next) {
      args.keyword = next;
      i += 1;
    } else if (arg === "--limit" && next) {
      args.limit = Math.max(1, Number.parseInt(next, 10) || 20);
      i += 1;
    } else if (arg === "--output-csv" && next) {
      args.outputCsv = next;
      i += 1;
    } else if (arg === "--output-report" && next) {
      args.outputReport = next;
      i += 1;
    } else if (arg === "--detail-limit" && next) {
      args.detailLimit = Math.max(0, Number.parseInt(next, 10) || 0);
      i += 1;
    } else if (arg === "--cdp-url" && next) {
      args.cdpUrl = next;
      i += 1;
    } else if (arg === "--openclaw-dir" && next) {
      args.openclawDir = next;
      i += 1;
    } else if (arg === "--playwright-root" && next) {
      args.playwrightRoot = next;
      i += 1;
    }
  }

  if (!args.keyword.trim()) {
    throw new Error("Missing required --keyword");
  }
  if (!args.outputCsv) {
    throw new Error("Missing required --output-csv");
  }
  return args;
}

function ensureDirFor(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function loadGatewayToken(openclawDir) {
  const configPath = path.join(openclawDir, "openclaw.json");
  const raw = fs.readFileSync(configPath, "utf8");
  const parsed = JSON.parse(raw);
  const token = parsed?.gateway?.auth?.token;
  if (!token || typeof token !== "string") {
    throw new Error(`Gateway token not found in ${configPath}`);
  }
  return token.trim();
}

function relayTokenForPort(gatewayToken, port) {
  return crypto
    .createHmac("sha256", gatewayToken)
    .update(`openclaw-extension-relay-v1:${port}`)
    .digest("hex");
}

function parsePort(cdpUrl) {
  const parsed = new URL(cdpUrl);
  const port = Number.parseInt(parsed.port, 10);
  if (!Number.isFinite(port)) {
    throw new Error(`Invalid cdp url port: ${cdpUrl}`);
  }
  return port;
}

function normalizeMetric(value) {
  const text = String(value || "").trim().replace(/,/g, "");
  if (!text) return 0;
  const match = text.match(/(\d+(?:\.\d+)?)(万|千)?/);
  if (!match) {
    const digits = text.replace(/[^\d]/g, "");
    return digits ? Number.parseInt(digits, 10) : 0;
  }
  let number = Number.parseFloat(match[1]);
  const unit = match[2] || "";
  if (unit === "万") number *= 10000;
  if (unit === "千") number *= 1000;
  return Math.round(number);
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, "\"\"")}"`;
  return text;
}

function isFallbackDetail(detail) {
  const title = String(detail.pageTitle || "");
  const joined = Array.isArray(detail.commentSamples) ? detail.commentSamples.join(" | ") : "";
  return (
    !title ||
    title.includes("你的生活兴趣社区") ||
    /创作中心|业务合作|沪ICP备/.test(joined)
  );
}

function sanitizeCommentText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/(?:\d+\s*分钟前|\d+\s*小时前|\d+\s*天前|\d{4}-\d{2}-\d{2}|\d{2}-\d{2})/g, " ")
    .replace(/(?:赞\d*|回复|展开\s*\d+\s*条回复)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTopicKeywords(samples) {
  const stopwords = new Set([
    "作者",
    "全新",
    "平台",
    "交易",
    "一个",
    "这个",
    "那个",
    "真的",
    "就是",
    "感觉",
    "可以",
    "一下",
    "支持",
    "官方",
    "苹果",
    "iPhone",
  ]);
  const counts = new Map();
  for (const sample of samples) {
    const cleaned = sanitizeCommentText(sample);
    const matches = cleaned.match(/[\u4e00-\u9fffA-Za-z0-9]{2,8}/g) || [];
    for (const token of matches) {
      if (/^\d+$/.test(token)) continue;
      if (stopwords.has(token)) continue;
      counts.set(token, (counts.get(token) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh-CN"))
    .slice(0, 5)
    .map(([token]) => token);
}

async function waitForCards(page) {
  await page.waitForFunction(
    () => document.querySelectorAll(".note-item").length > 0,
    { timeout: 30000 }
  ).catch(() => {});
  await page.waitForTimeout(4000);
}

async function collectVisibleResults(page, limit, keyword) {
  await waitForCards(page);
  return page.evaluate(
    ({ limitInner, keywordInner }) => {
      const rows = Array.from(document.querySelectorAll(".note-item")).slice(0, limitInner);
      return rows.map((item, index) => ({
        ranking: index + 1,
        source_index: index,
        keyword: keywordInner,
        title:
          item.querySelector(".title span")?.textContent?.trim() ||
          item.querySelector(".title")?.textContent?.trim() ||
          item.querySelector("img")?.alt?.trim() ||
          "",
        author:
          item.querySelector(".author .name")?.textContent?.trim() ||
          item.querySelector(".author-wrapper .author-name")?.textContent?.trim() ||
          "",
        likes_raw:
          item.querySelector(".like-wrapper .count")?.textContent?.trim() ||
          item.querySelector(".count")?.textContent?.trim() ||
          "",
        url: item.querySelector("a.cover, a")?.href || "",
        source_page: location.href,
        captured_at: new Date().toISOString(),
      }));
    },
    { limitInner: limit, keywordInner: keyword }
  );
}

async function openDetailFromSearch(page, targetUrl, noteUrl, sourceIndex) {
  await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});
  await waitForCards(page);
  const targetPath = (() => {
    try {
      return new URL(noteUrl).pathname;
    } catch {
      return "";
    }
  })();
  let matchedIndex = -1;
  if (targetPath) {
    matchedIndex = await page.evaluate((pathToMatch) => {
      const cards = Array.from(document.querySelectorAll(".note-item"));
      return cards.findIndex((item) => {
        const href = item.querySelector("a.cover, a")?.href || "";
        try {
          return new URL(href).pathname === pathToMatch;
        } catch {
          return false;
        }
      });
    }, targetPath);
  }
  const card = page.locator(".note-item").nth(matchedIndex >= 0 ? matchedIndex : sourceIndex);
  await card.click({ timeout: 15000 });
  await page.waitForURL(/\/explore\//, { timeout: 20000 }).catch(() => {});
  await page.waitForFunction(
    () => document.querySelectorAll(".comments-container,.comment-item,.interaction-container,.note-content").length > 0,
    { timeout: 20000 }
  ).catch(() => {});
  await page.waitForTimeout(4000);
  await page.mouse.wheel(0, 1200).catch(() => {});
  await page.waitForTimeout(2500);
}

async function collectDetailFromCurrentPage(page) {
  return page.evaluate(() => {
    const bodyText = document.body?.innerText || "";
    const rawComments = Array.from(document.querySelectorAll(".comment-item,.parent-comment,.comment-inner-container"))
      .map((el) => (el.textContent || "").trim())
      .filter(Boolean)
      .filter((value, index, list) => list.indexOf(value) === index)
      .slice(0, 20);
    const publishHint =
      bodyText
        .split("\n")
        .map((line) => line.trim())
        .find(
          (line) =>
            line.length <= 20 &&
            !/沪ICP备|营业执照|公网安备|许可证/.test(line) &&
            /^(?:\d{4}-\d{2}-\d{2}|\d+\s*(天前|小时前|分钟前)|\d{2}-\d{2})$/.test(line)
        ) || "";
    const commentsText =
      document.querySelector(".comments-el,.comments-container")?.textContent?.trim() || "";
    const commentsCountMatch = commentsText.match(/共\s*(\d+)\s*条评论/);
    return {
      pageTitle: document.title || "",
      currentUrl: location.href,
      likesDetail: document.querySelector(".like-wrapper .count")?.textContent?.trim() || "",
      commentsCount: commentsCountMatch ? commentsCountMatch[1] : "",
      publishHint,
      commentSamples: rawComments,
    };
  });
}

function writeCsv(filePath, rows) {
  const headers = [
    "ranking",
    "keyword",
    "title",
    "author",
    "likes_raw",
    "likes_normalized",
    "url",
    "publish_hint",
    "detail_page_title",
    "detail_comments_count",
    "comment_topic_keywords",
    "comment_topic_samples",
    "source_page",
    "captured_at",
  ];
  const body = rows.map((row) =>
    headers
      .map((header) => {
        const value = row[header] ?? "";
        return csvEscape(Array.isArray(value) ? value.join(" | ") : value);
      })
      .join(",")
  );
  ensureDirFor(filePath);
  fs.writeFileSync(filePath, `\ufeff${[headers.join(","), ...body].join("\n")}`, "utf8");
}

function writeReport(filePath, summary) {
  const lines = [
    "# Xiaohongshu Relay Collection Report",
    "",
    "## Run",
    "",
    `- keyword: ${summary.keyword}`,
    `- requested_limit: ${summary.requestedLimit}`,
    `- collected_visible_rows: ${summary.visibleRows}`,
    `- detail_attempts: ${summary.detailAttempts}`,
    `- detail_successes: ${summary.detailSuccesses}`,
    `- output_csv: ${summary.outputCsv}`,
    "",
    "## Notes",
    "",
    "- This run uses the authenticated Chrome relay instead of the unstable OpenClaw browser snapshot wrapper.",
    "- Results come from visible Xiaohongshu search cards in the current browser session.",
    "- Detail extraction now prefers clicking into note cards from the search page before collecting publish hints and comments.",
    "",
    "## Problems Seen",
    "",
    ...summary.problems.map((problem) => `- ${problem}`),
    "",
  ];
  ensureDirFor(filePath);
  fs.writeFileSync(filePath, lines.join("\n"), "utf8");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const gatewayToken = loadGatewayToken(args.openclawDir);
  const relayToken = relayTokenForPort(gatewayToken, parsePort(args.cdpUrl));
  const { chromium } = require(args.playwrightRoot);
  const browser = await chromium.connectOverCDP(args.cdpUrl, {
    headers: { "x-openclaw-relay-token": relayToken },
  });

  const summary = {
    keyword: args.keyword,
    requestedLimit: args.limit,
    visibleRows: 0,
    detailAttempts: 0,
    detailSuccesses: 0,
    outputCsv: args.outputCsv,
    problems: [],
  };

  try {
    const context = browser.contexts()[0];
    if (!context) throw new Error("No browser context found from relay connection");
    const page = context.pages()[0] || (await context.newPage());
    const targetUrl = `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(args.keyword)}`;

    await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});
    const rows = await collectVisibleResults(page, args.limit, args.keyword);
    if (!rows.length) {
      summary.problems.push("No visible Xiaohongshu search cards were extracted.");
    }

    for (const row of rows) {
      row.likes_normalized = normalizeMetric(row.likes_raw);
      row.publish_hint = "";
      row.detail_page_title = "";
      row.detail_comments_count = "";
      row.comment_topic_keywords = [];
      row.comment_topic_samples = [];
    }

    rows.sort((a, b) => b.likes_normalized - a.likes_normalized);
    rows.forEach((row, index) => {
      row.ranking = index + 1;
    });
    summary.visibleRows = rows.length;

    const detailRows = rows.slice(0, Math.min(args.detailLimit, rows.length));
    for (const row of detailRows) {
      summary.detailAttempts += 1;
      try {
        await openDetailFromSearch(page, targetUrl, row.url, row.source_index);
        const detail = await collectDetailFromCurrentPage(page);
        const fallback = isFallbackDetail(detail);
        if (fallback) {
          summary.problems.push(`Detail page fell back to generic Xiaohongshu page for ranking ${row.ranking}.`);
        } else {
          const samples = detail.commentSamples.map(sanitizeCommentText).filter(Boolean).slice(0, 8);
          row.publish_hint = detail.publishHint || "";
          row.detail_page_title = detail.pageTitle || "";
          row.detail_comments_count = detail.commentsCount || "";
          row.comment_topic_samples = samples;
          row.comment_topic_keywords = extractTopicKeywords(samples);
          row.url = detail.currentUrl || row.url;
        }
        summary.detailSuccesses += 1;
      } catch (error) {
        summary.problems.push(`Detail fetch failed for ranking ${row.ranking}: ${String(error.message || error)}`);
      }
    }

    if (!summary.problems.length) {
      summary.problems.push("No blocking errors during relay collection.");
    }

    writeCsv(args.outputCsv, rows);
    if (args.outputReport) {
      writeReport(args.outputReport, summary);
    }

    console.log(
      JSON.stringify(
        {
          ok: true,
          outputCsv: args.outputCsv,
          outputReport: args.outputReport || null,
          visibleRows: summary.visibleRows,
          detailAttempts: summary.detailAttempts,
          detailSuccesses: summary.detailSuccesses,
          problems: summary.problems,
        },
        null,
        2
      )
    );
  } finally {
    await browser.close().catch(() => {});
  }
}

main().catch((error) => {
  console.error(String(error && error.stack ? error.stack : error));
  process.exit(1);
});
