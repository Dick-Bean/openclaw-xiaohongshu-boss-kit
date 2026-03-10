#!/usr/bin/env python3
import csv
import re
import sys
from pathlib import Path


def normalize_metric(value: str) -> int:
    if value is None:
        return 0
    text = str(value).strip().replace(",", "")
    if not text:
        return 0
    match = re.search(r"(\d+(?:\.\d+)?)\s*([万千]?)", text)
    if not match:
        digits = re.sub(r"[^\d]", "", text)
        return int(digits) if digits else 0
    number = float(match.group(1))
    unit = match.group(2)
    if unit == "万":
        number *= 10000
    elif unit == "千":
        number *= 1000
    return int(number)


def main() -> int:
    if len(sys.argv) < 3 or len(sys.argv) > 6:
        print(
            "Usage: rank_xhs_csv.py <input.csv> <output.csv> [likes_weight] [collects_weight] [comments_weight]",
            file=sys.stderr,
        )
        return 2

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    likes_weight = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0
    collects_weight = float(sys.argv[4]) if len(sys.argv) > 4 else 0.5
    comments_weight = float(sys.argv[5]) if len(sys.argv) > 5 else 0.3

    with input_path.open("r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        fieldnames = list(reader.fieldnames or [])

    metric_pairs = [
        ("likes_raw", "likes_normalized"),
        ("collects_raw", "collects_normalized"),
        ("comments_raw", "comments_normalized"),
    ]
    for raw_name, normalized_name in metric_pairs:
        if normalized_name not in fieldnames:
            fieldnames.append(normalized_name)
        for row in rows:
            row[normalized_name] = str(normalize_metric(row.get(raw_name, "")))

    if "engagement_score" not in fieldnames:
        fieldnames.append("engagement_score")

    for row in rows:
        likes = int(row.get("likes_normalized", "0") or "0")
        collects = int(row.get("collects_normalized", "0") or "0")
        comments = int(row.get("comments_normalized", "0") or "0")
        score = likes * likes_weight + collects * collects_weight + comments * comments_weight
        row["engagement_score"] = f"{score:.2f}"

    rows.sort(key=lambda row: float(row.get("engagement_score", "0") or "0"), reverse=True)

    if "ranking" not in fieldnames:
        fieldnames.insert(0, "ranking")
    for index, row in enumerate(rows, start=1):
        row["ranking"] = str(index)

    with output_path.open("w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
