#!/bin/bash
#
# Accessibility Audit Script
# Runs Lighthouse CLI on key pages and checks accessibility scores
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BASE_URL="http://localhost:3000"
MIN_SCORE=90
REPORT_DIR="lighthouse-reports"

# Test URLs
URLS=(
  "/"
  "/toc"
  "/lesson/intro-to-react"
)

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}♿ Accessibility Audit${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if Lighthouse CLI is installed
if ! command -v lighthouse &> /dev/null; then
  echo -e "${RED}✗ Error: Lighthouse CLI not found${NC}"
  echo -e "  Install with: ${YELLOW}npm install -g @lhci/cli lighthouse${NC}"
  exit 1
fi

# Check if dev server is running
if ! curl -s "$BASE_URL" > /dev/null 2>&1; then
  echo -e "${RED}✗ Error: Dev server not running at $BASE_URL${NC}"
  echo -e "  Start with: ${YELLOW}pnpm dev${NC}"
  exit 1
fi

# Create report directory
mkdir -p "$REPORT_DIR"

PASSED=0
FAILED=0
TOTAL=${#URLS[@]}

echo -e "${BLUE}Running Lighthouse on $TOTAL pages...${NC}"
echo ""

# Run Lighthouse on each URL
for url in "${URLS[@]}"; do
  FULL_URL="${BASE_URL}${url}"
  SLUG=$(echo "$url" | sed 's/\//-/g' | sed 's/^-//')
  SLUG=${SLUG:-home}

  echo -e "${YELLOW}→${NC} Testing: ${BLUE}$url${NC}"

  # Run Lighthouse (focusing on accessibility)
  lighthouse "$FULL_URL" \
    --only-categories=accessibility \
    --output=html \
    --output=json \
    --output-path="$REPORT_DIR/$SLUG" \
    --quiet \
    --chrome-flags="--headless --no-sandbox --disable-gpu" \
    2>&1 | grep -v "DevTools listening" || true

  # Parse the JSON report for accessibility score
  if [ -f "$REPORT_DIR/$SLUG.report.json" ]; then
    SCORE=$(node -e "
      const report = require('./$REPORT_DIR/$SLUG.report.json');
      const score = Math.round(report.categories.accessibility.score * 100);
      console.log(score);
    ")

    if [ "$SCORE" -ge "$MIN_SCORE" ]; then
      echo -e "  ${GREEN}✓ PASS:${NC} Accessibility score: ${GREEN}$SCORE${NC}/100"
      PASSED=$((PASSED + 1))
    else
      echo -e "  ${RED}✗ FAIL:${NC} Accessibility score: ${RED}$SCORE${NC}/100 (required: ≥$MIN_SCORE)"
      FAILED=$((FAILED + 1))
    fi

    echo -e "  ${BLUE}→${NC} HTML report: ${BLUE}$REPORT_DIR/$SLUG.report.html${NC}"
  else
    echo -e "  ${RED}✗ ERROR:${NC} Failed to generate report"
    FAILED=$((FAILED + 1))
  fi

  echo ""
done

# Summary
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 Audit Summary${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "  Pages tested:  ${BLUE}${TOTAL}${NC}"
echo -e "  Passed:        ${GREEN}${PASSED}${NC}"
echo -e "  Failed:        ${RED}${FAILED}${NC}"
echo -e "  Reports:       ${BLUE}$REPORT_DIR/${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All accessibility checks passed!${NC}"
  echo ""
  exit 0
else
  echo -e "${RED}✗ Accessibility audit failed${NC}"
  echo -e "${RED}  Review the HTML reports for details${NC}"
  echo ""
  exit 1
fi
