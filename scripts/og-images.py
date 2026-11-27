"""Draw the link-share preview images (1200x630) into public/og/.

Run after changing a project's title or tagline, or the profile headline:
    uv run --with pillow python scripts/og-images.py

Text comes from src/data/profile.ts and src/content/projects/*.mdx, so the images never hold
a sentence the site does not. Layout follows the site: dot grid, black mono chip, bold headline.
"""

import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public/og"
BOLD = ROOT / "node_modules/pretendard/dist/public/static/Pretendard-Bold.otf"
REGULAR = ROOT / "node_modules/pretendard/dist/public/static/Pretendard-Regular.otf"
MONO = ROOT / "node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff"

WIDTH, HEIGHT = 1200, 630
PAD = 80
INK = (17, 17, 16)
MUTED = (101, 101, 97)
DOT = (231, 231, 231)
LINE = (219, 219, 219)


def frontmatter(path: Path) -> dict[str, str]:
    block = path.read_text(encoding="utf-8").split("---")[1]
    return dict(re.findall(r"^(\w+): (.+)$", block, flags=re.MULTILINE))


def find(pattern: str, source: str) -> tuple[str, ...]:
    match = re.search(pattern, source)
    if match is None:
        raise SystemExit(f"profile.ts no longer matches {pattern}; update scripts/og-images.py")
    return match.groups()


def profile() -> tuple[str, str, list[str]]:
    """Return name, role and the two headline lines."""
    source = (ROOT / "src/data/profile.ts").read_text(encoding="utf-8")
    (name,) = find(r"name: '([^']+)'", source)
    (role,) = find(r"role: '([^']+)'", source)
    title = find(r"title: \['([^']+)', '([^']+)'\]", source)
    return name, role, list(title)


def spaced(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, font, fill, tracking: float) -> int:
    """Draw text with letter spacing (Pillow has none); return the end x."""
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=font, fill=fill)
        x += draw.textlength(char, font=font) + tracking
    return int(x - tracking)


def measure(draw: ImageDraw.ImageDraw, text: str, font, tracking: float) -> float:
    return draw.textlength(text, font=font) + tracking * (len(text) - 1)


def wrap(draw: ImageDraw.ImageDraw, text: str, font, width: int, tracking: float) -> list[str]:
    lines, line = [], ""
    for word in text.split(" "):
        trial = f"{line} {word}".strip()
        if line and measure(draw, trial, font, tracking) > width:
            lines.append(line)
            line = word
        else:
            line = trial
    return [*lines, line]


def card(chip: str, kicker: str, headline: list[str], footer: str) -> Image.Image:
    image = Image.new("RGB", (WIDTH, HEIGHT), "white")
    draw = ImageDraw.Draw(image)
    for y in range(0, HEIGHT, 4):
        for x in range(0, WIDTH, 4):
            draw.point((x, y), fill=DOT)

    mono = ImageFont.truetype(str(MONO), 22)
    chip_width = spaced(draw, (0, -100), chip, mono, INK, 4)
    draw.rectangle((PAD, PAD, PAD + chip_width + 32, PAD + 44), fill=INK)
    spaced(draw, (PAD + 16, PAD + 9), chip, mono, "white", 4)
    spaced(draw, (PAD + chip_width + 56, PAD + 9), kicker, mono, INK, 4)

    # Same tight tracking as the site's display text (-0.035em).
    size, limit = 84, WIDTH - 2 * PAD
    while True:
        bold = ImageFont.truetype(str(BOLD), size)
        tracking = -0.035 * size
        lines = [part for line in headline for part in wrap(draw, line, bold, limit, tracking)]
        if len(lines) <= 3 and all(measure(draw, line, bold, tracking) <= limit for line in lines):
            break
        size -= 4
    y = PAD + 110
    for line in lines:
        spaced(draw, (PAD - 2, y), line, bold, INK, tracking)
        y += int(size * 1.16)

    draw.line((PAD, HEIGHT - PAD - 44, WIDTH - PAD, HEIGHT - PAD - 44), fill=LINE, width=1)
    draw.text((PAD, HEIGHT - PAD - 24), footer, font=ImageFont.truetype(str(REGULAR), 26), fill=MUTED)
    return image


def main() -> None:
    OUT_DIR.mkdir(exist_ok=True)
    name, role, title = profile()
    footer = f"{name} · {role}"
    cards = {"home": card("PYTHON BACKEND", "PORTFOLIO", title, footer)}
    for path in sorted((ROOT / "src/content/projects").glob("*.mdx")):
        data = frontmatter(path)
        chip = f"PROJECT {int(data['order']):02d}"
        cards[path.stem] = card(chip, data["title"].upper(), [data["tagline"]], footer)
    for name, image in cards.items():
        image.save(OUT_DIR / f"{name}.png", optimize=True)
        print(f"og/{name}.png {(OUT_DIR / f'{name}.png').stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
