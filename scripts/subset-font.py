"""Build public/fonts/pretendard-subset.woff2 from the characters the site uses.

Run after changing any Korean text:
    uv run --with fonttools --with brotli python scripts/subset-font.py

The full Pretendard Variable file is 2 MB; the site uses a few hundred Hangul syllables.
`pnpm check:font` fails when a built page holds a character missing from the subset.
"""

from pathlib import Path

from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2"
OUT_DIR = ROOT / "public/fonts"
TEXT_SUFFIXES = {".astro", ".mdx", ".md", ".ts"}
# Markdown's smart punctuation turns ASCII quotes, dashes and dots into these, so they never appear in the source.
SMART_PUNCTUATION = "\u2018\u2019\u201c\u201d\u2013\u2014\u2026"


def used_characters() -> str:
    chars = {chr(code) for code in range(0x20, 0x7F)} | set(SMART_PUNCTUATION)
    for path in (ROOT / "src").rglob("*"):
        if path.suffix in TEXT_SUFFIXES:
            chars.update(char for char in path.read_text(encoding="utf-8") if ord(char) > 0x7E)
    return "".join(sorted(chars))


def main() -> None:
    text = used_characters()
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    font = subset.load_font(str(SOURCE), options)
    subsetter = subset.Subsetter(options)
    subsetter.populate(text=text)
    subsetter.subset(font)
    OUT_DIR.mkdir(exist_ok=True)
    subset.save_font(font, str(OUT_DIR / "pretendard-subset.woff2"), options)
    (OUT_DIR / "pretendard-subset.txt").write_text(text, encoding="utf-8")
    size = (OUT_DIR / "pretendard-subset.woff2").stat().st_size
    print(f"pretendard-subset.woff2: {len(text)} characters, {size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
