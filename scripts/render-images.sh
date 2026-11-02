#!/usr/bin/env bash
# Renders the social share image and PNG icons from HTML/SVG sources using headless Chrome.
# Runs in GitHub Actions (ubuntu-latest ships with Google Chrome). Only renders missing files.
set -euo pipefail
CHROME="$(command -v google-chrome || command -v google-chrome-stable || command -v chromium || command -v chromium-browser || true)"
if [ -z "$CHROME" ]; then echo "No Chrome found; skipping image render"; exit 0; fi
render() { # $1 html, $2 WxH, $3 out
  "$CHROME" --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --default-background-color=00000000 --window-size="$2" --screenshot="$3" "file://$PWD/scripts/og/$1" >/dev/null 2>&1 || true
}
mkdir -p assets/img
[ -s assets/img/og-image.png ]        || render og.html   1200,630 assets/img/og-image.png
[ -s assets/img/logo-512.png ]        || render icon.html 512,512  assets/img/logo-512.png
[ -s assets/img/icon-192.png ]        || render icon.html 192,192  assets/img/icon-192.png
[ -s assets/img/apple-touch-icon.png ] || render icon.html 180,180  assets/img/apple-touch-icon.png
[ -s assets/img/favicon-32.png ]      || render icon.html 32,32    assets/img/favicon-32.png
ls -la assets/img
