#!/bin/bash
#
# Tailwind v4 Compliance Audit Script
# Checks for Tailwind v4 violations in the codebase
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

VIOLATIONS=0
CHECKS_PASSED=0

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🔍 Tailwind CSS v4 Compliance Audit${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check 1: No tailwind.config.js (Tailwind v4 uses @theme in CSS)
echo -e "${YELLOW}[1/4]${NC} Checking for legacy tailwind.config.js..."
if [ -f "tailwind.config.js" ] || [ -f "tailwind.config.ts" ]; then
  echo -e "${RED}✗ FAIL:${NC} Found tailwind.config.js/ts (Tailwind v4 violation)"
  echo -e "  ${RED}→${NC} Tailwind v4 uses @theme directive in CSS files"
  echo -e "  ${RED}→${NC} Remove tailwind.config.js and move config to globals.css"
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo -e "${GREEN}✓ PASS:${NC} No legacy config files found"
  CHECKS_PASSED=$((CHECKS_PASSED + 1))
fi
echo ""

# Check 2: No @apply in JSX/TSX files (should be in CSS only)
echo -e "${YELLOW}[2/4]${NC} Checking for @apply in component files..."
APPLY_FILES=$(grep -r "@apply" --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" src/ 2>/dev/null || true)
if [ -n "$APPLY_FILES" ]; then
  echo -e "${RED}✗ FAIL:${NC} Found @apply in component files:"
  echo "$APPLY_FILES" | while IFS= read -r line; do
    echo -e "  ${RED}→${NC} $line"
  done
  echo -e "  ${RED}→${NC} Move @apply directives to CSS files (globals.css or component styles)"
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo -e "${GREEN}✓ PASS:${NC} No @apply found in component files"
  CHECKS_PASSED=$((CHECKS_PASSED + 1))
fi
echo ""

# Check 3: No legacy directional properties (must use logical properties)
echo -e "${YELLOW}[3/4]${NC} Checking for legacy directional class patterns..."
# Pattern matches: pl-, pr-, ml-, mr-, etc. (should use ps-, pe-, ms-, me-)
LEGACY_PATTERNS=$(grep -rE "(className=\"[^\"]*\b(pl|pr|ml|mr|border-l|border-r)-|className='[^']*\b(pl|pr|ml|mr|border-l|border-r)-)" \
  --include="*.tsx" --include="*.jsx" src/ 2>/dev/null || true)

if [ -n "$LEGACY_PATTERNS" ]; then
  echo -e "${RED}✗ FAIL:${NC} Found legacy directional properties:"
  echo "$LEGACY_PATTERNS" | head -n 10 | while IFS= read -r line; do
    echo -e "  ${RED}→${NC} $line"
  done
  if [ "$(echo "$LEGACY_PATTERNS" | wc -l)" -gt 10 ]; then
    echo -e "  ${YELLOW}... and $(($(echo "$LEGACY_PATTERNS" | wc -l) - 10)) more${NC}"
  fi
  echo -e "  ${RED}→${NC} Use logical properties instead:"
  echo -e "     pl-4 → ps-4 (padding-inline-start)"
  echo -e "     pr-4 → pe-4 (padding-inline-end)"
  echo -e "     ml-4 → ms-4 (margin-inline-start)"
  echo -e "     mr-4 → me-4 (margin-inline-end)"
  echo -e "     border-l → border-s (border-inline-start)"
  echo -e "     border-r → border-e (border-inline-end)"
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo -e "${GREEN}✓ PASS:${NC} No legacy directional properties found"
  CHECKS_PASSED=$((CHECKS_PASSED + 1))
fi
echo ""

# Check 4: Verify @theme usage in CSS files
echo -e "${YELLOW}[4/4]${NC} Checking for @theme directive in CSS..."
if grep -q "@theme" src/app/globals.css 2>/dev/null; then
  echo -e "${GREEN}✓ PASS:${NC} Found @theme directive in globals.css"
  CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
  echo -e "${YELLOW}⚠ WARNING:${NC} No @theme directive found in globals.css"
  echo -e "  ${YELLOW}→${NC} Tailwind v4 should use @theme for configuration"
  # This is a warning, not a hard failure
  CHECKS_PASSED=$((CHECKS_PASSED + 1))
fi
echo ""

# Summary
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 Audit Summary${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "  Checks passed: ${GREEN}${CHECKS_PASSED}/4${NC}"
echo -e "  Violations:    ${RED}${VIOLATIONS}${NC}"
echo ""

if [ $VIOLATIONS -eq 0 ]; then
  echo -e "${GREEN}✓ All Tailwind v4 compliance checks passed!${NC}"
  echo ""
  exit 0
else
  echo -e "${RED}✗ Tailwind v4 compliance audit failed${NC}"
  echo -e "${RED}  Fix the violations above and run again${NC}"
  echo ""
  exit 1
fi
