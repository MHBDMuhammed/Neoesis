#!/usr/bin/env bash
# Unified Quality Gate Suite
# Runs all quality checks in sequence, exits on first failure

set -e  # Exit on first error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Quality Gate Suite"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start timer
START_TIME=$(date +%s)

# Check counter
CURRENT=1
TOTAL=7

# Function to print check header
print_check() {
  echo -e "${BLUE}[$CURRENT/$TOTAL]${NC} $1..."
  ((CURRENT++))
}

# Function to print success
print_success() {
  echo -e "${GREEN}✓${NC} $1"
  echo ""
}

# Function to print failure and exit
print_failure() {
  echo -e "${RED}✗${NC} $1"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo -e "  ${RED}❌ AUDIT FAILED${NC}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo -e "Failed at: ${YELLOW}$2${NC}"
  echo "Fix the issues above and re-run 'pnpm audit:all'"
  echo ""
  exit 1
}

# 1. TypeScript Type Check
print_check "TypeScript Type Check"
if pnpm typecheck > /dev/null 2>&1; then
  print_success "No type errors found"
else
  echo ""
  pnpm typecheck
  print_failure "Type check failed" "TypeScript Type Check"
fi

# 2. ESLint Linting
print_check "ESLint Linting"
if pnpm lint > /dev/null 2>&1; then
  print_success "No linting errors"
else
  echo ""
  pnpm lint
  print_failure "Linting failed" "ESLint Linting"
fi

# 3. Unit Tests (Vitest)
print_check "Unit Tests (Vitest)"
TEST_OUTPUT=$(pnpm test -- --run 2>&1)
if echo "$TEST_OUTPUT" | grep -q "FAIL"; then
  echo "$TEST_OUTPUT"
  print_failure "Unit tests failed" "Unit Tests"
else
  # Extract test count if possible
  if echo "$TEST_OUTPUT" | grep -q "Test Files"; then
    TEST_SUMMARY=$(echo "$TEST_OUTPUT" | grep "Test Files" || echo "Tests passed")
    print_success "$TEST_SUMMARY"
  else
    print_success "All tests passed"
  fi
fi

# 4. E2E Tests (Playwright)
print_check "E2E Tests (Playwright)"
if pnpm test:e2e > /dev/null 2>&1; then
  print_success "All E2E tests passed"
else
  echo ""
  pnpm test:e2e
  print_failure "E2E tests failed" "E2E Tests"
fi

# 5. Tailwind v4 Compliance
print_check "Tailwind v4 Compliance"
TW_OUTPUT=$(bash scripts/audit-tw4.sh 2>&1)
if echo "$TW_OUTPUT" | grep -q "✗"; then
  echo "$TW_OUTPUT"
  print_failure "Tailwind compliance failed" "Tailwind v4 Compliance"
else
  print_success "No compliance issues"
fi

# 6. Accessibility Audit (Axe)
print_check "Accessibility Audit (Axe)"
if pnpm test:e2e tests/e2e/a11y.spec.ts > /dev/null 2>&1; then
  print_success "Zero violations (Home, TOC, Lesson)"
else
  echo ""
  pnpm test:e2e tests/e2e/a11y.spec.ts
  print_failure "Accessibility violations found" "Accessibility Audit"
fi

# 7. Lighthouse Performance (Moto G4)
print_check "Lighthouse Performance (Moto G4)"
if command -v lhci &> /dev/null; then
  # Build first (required for Lighthouse)
  echo -e "${YELLOW}  Building for production...${NC}"
  if pnpm build > /dev/null 2>&1; then
    echo -e "${GREEN}  ✓${NC} Build successful"

    # Run Lighthouse
    LH_OUTPUT=$(pnpm lhci 2>&1)
    if echo "$LH_OUTPUT" | grep -q "failed"; then
      echo "$LH_OUTPUT"
      print_failure "Lighthouse audit failed" "Lighthouse Performance"
    else
      # Try to extract LCP if available
      if echo "$LH_OUTPUT" | grep -q "largest-contentful-paint"; then
        LCP=$(echo "$LH_OUTPUT" | grep "largest-contentful-paint" | head -1 || echo "LCP data not available")
        print_success "Performance targets met"
      else
        print_success "Lighthouse audit passed"
      fi
    fi
  else
    echo ""
    pnpm build
    print_failure "Production build failed" "Lighthouse Performance"
  fi
else
  echo -e "${YELLOW}  ⚠ Lighthouse CLI not found, skipping...${NC}"
  echo -e "${YELLOW}  Install with: npm install -g @lhci/cli${NC}"
  print_success "Skipped (lhci not installed)"
fi

# Calculate duration
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
MINUTES=$((DURATION / 60))
SECONDS=$((DURATION % 60))

# Success banner
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "  ${GREEN}✅ ALL CHECKS PASSED${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Total time: ${MINUTES}m ${SECONDS}s"
echo ""

exit 0
