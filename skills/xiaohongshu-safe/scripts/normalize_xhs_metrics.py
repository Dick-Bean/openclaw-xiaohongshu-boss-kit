#!/usr/bin/env python3
import csv
import re
import sys
from pathlib import Path


TEN_THOUSAND = "\u4e07"
THOUSAND = "\u5343"


def normalize_metric(value: str) -> int:
    if value is None:
        return 0

    text = str(value).strip().replace(",", "")
    if not text:
        return 0

    match = re.search(r"(\d+(?:\.\d+)?)\s*([\u4e07\u5343]?)", text)
    if not match:
        digits = re.sub(r"[^\d]", "", text)
        return int(digits) if digits else 0

    number = float(match.group(1))
    unit = match.group(2)
    if unit == TEN_THOUSAND:
        number *= 10000
    elif unit == THOUSAND:
        number *= 1000
    return int(number)


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: normalize_xhs_metrics.py <input.csv> <output.csv>", file=sys.stderr)
        return 2

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])

    with input_path.open("r", encoding="utf-8-sig", newline="") as file:
        reader = csv.DictReader(file)
        rows = list(reader)
        fieldnames = list(reader.fieldnames or [])

    desired_columns = [
        ("likes_raw", "likes_normalized"),
        ("collects_raw", "collects_normalized"),
        ("comments_raw", "comments_normalized"),
    ]

    for raw_name, normalized_name in desired_columns:
        if normalized_name not in fieldnames:
            fieldnames.append(normalized_name)
        for row in rows:
            row[normalized_name] = str(normalize_metric(row.get(raw_name, "")))

    if "likes_normalized" in fieldnames:
        rows.sort(key=lambda row: int(row.get("likes_normalized", "0") or "0"), reverse=True)

    if "ranking" not in fieldnames:
        fieldnames.insert(0, "ranking")

    for index, row in enumerate(rows, start=1):
        row["ranking"] = str(index)

    with output_path.open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
