#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path("/Users/wonyoung_choi/projects/vibe-coding-tips")
TARGET_DIRS = ["prompts", "playbooks", "sources"]
OUT_ROOT = ROOT / "locales" / "en"
API_URL = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q="


def translate_text(value: str) -> str:
    value = value.strip()
    if not value:
      return value
    if re.fullmatch(r"[A-Za-z0-9 .,:/()_\-]+", value):
      return value

    url = API_URL + urllib.parse.quote(value)
    with urllib.request.urlopen(url, timeout=30) as response:
      payload = response.read().decode("utf-8")

    translated = "".join(part[0] for part in json.loads(payload)[0])
    time.sleep(0.04)
    return translated


def protect_inline_code(text: str):
    store: list[str] = []

    def repl(match: re.Match[str]):
      store.append(match.group(0))
      return f"@@CODE{len(store) - 1}@@"

    protected = re.sub(r"`[^`]+`", repl, text)
    return protected, store


def restore_inline_code(text: str, store: list[str]) -> str:
    for idx, value in enumerate(store):
      text = text.replace(f"@@CODE{idx}@@", value)
    return text


def translate_line(line: str) -> str:
    if not line.strip():
      return line

    leading = re.match(r"^(\s*)", line).group(1)
    stripped = line.strip()

    if stripped.startswith("```") or stripped.startswith("- 링크:") or stripped.startswith("http"):
      return line

    prefix = ""
    content = stripped

    heading = re.match(r"^(#+\s+)(.+)$", stripped)
    bullet = re.match(r"^(-\s+)(.+)$", stripped)
    ordered = re.match(r"^(\d+\.\s+)(.+)$", stripped)

    if heading:
      prefix, content = heading.groups()
    elif bullet:
      prefix, content = bullet.groups()
    elif ordered:
      prefix, content = ordered.groups()

    protected, store = protect_inline_code(content)
    translated = translate_text(protected)
    translated = restore_inline_code(translated, store)
    return f"{leading}{prefix}{translated}"


def translate_frontmatter(frontmatter: str) -> str:
    out: list[str] = []
    for line in frontmatter.splitlines():
      if line.startswith("title:"):
        value = line.split(":", 1)[1].strip().strip("'\"")
        out.append(f'title: "{translate_text(value)}"')
      elif line.startswith("summary:"):
        value = line.split(":", 1)[1].strip().strip("'\"")
        out.append(f'summary: "{translate_text(value)}"')
      else:
        out.append(line)
    return "\n".join(out)


def translate_markdown(source: str) -> str:
    frontmatter = ""
    body = source

    if source.startswith("---\n"):
      _, fm, body = source.split("---\n", 2)
      frontmatter = f"---\n{translate_frontmatter(fm.strip())}\n---\n"

    translated_lines: list[str] = []
    in_code = False
    for line in body.splitlines():
      if line.strip().startswith("```"):
        in_code = not in_code
        translated_lines.append(line)
        continue

      if in_code:
        translated_lines.append(line)
        continue

      translated_lines.append(translate_line(line))

    return frontmatter + "\n".join(translated_lines) + "\n"


def main():
    for target in TARGET_DIRS:
      for file_path in sorted((ROOT / target).rglob("*.md")):
        relative = file_path.relative_to(ROOT)
        destination = OUT_ROOT / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        translated = translate_markdown(file_path.read_text())
        destination.write_text(translated)
        print(f"translated {relative}", flush=True)


if __name__ == "__main__":
    main()
