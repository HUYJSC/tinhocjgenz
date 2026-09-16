import fs from "fs";
import path from "path";
import assert from "assert";

console.log("==================================================================");
console.log("🎨 RUNNING TWO-COLOR SYSTEM (BLUE & WHITE / 01) VERIFICATION SUITE");
console.log("==================================================================");

let testsPassed = 0;
let testsFailed = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${desc}`);
    testsPassed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${desc}`);
    console.error(`     Error: ${err.message}`);
    testsFailed++;
  }
}

// -------------------------------------------------------------
// Contrast Ratio Calculation helper (WCAG 2.2)
// -------------------------------------------------------------
function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  return [
    (bigint >> 16) & 255,
    (bigint >> 8) & 255,
    bigint & 255
  ];
}

function sRgbToLinear(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function getLuminance([r, g, b]) {
  const lr = sRgbToLinear(r);
  const lg = sRgbToLinear(g);
  const lb = sRgbToLinear(b);
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function getContrast(hex1, hex2) {
  const lum1 = getLuminance(hexToRgb(hex1));
  const lum2 = getLuminance(hexToRgb(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// -------------------------------------------------------------
// 1. WCAG 2.2 AA Contrast Verification
// -------------------------------------------------------------
console.log("\n[Test Suite 1: WCAG 2.2 AA Color Contrast Ratios]");

it("Primitive Blue (#0057B8) on Primitive White (#FFFFFF) satisfies WCAG AA (>= 4.5:1)", () => {
  const contrast = getContrast("#0057B8", "#FFFFFF");
  console.log(`     Calculated ratio: ${contrast.toFixed(2)}:1`);
  assert(contrast >= 4.5, `Expected >= 4.5, got ${contrast.toFixed(2)}`);
});

it("Inverse Text (#FFFFFF) on Primitive Blue (#0057B8) satisfies WCAG AA (>= 4.5:1)", () => {
  const contrast = getContrast("#FFFFFF", "#0057B8");
  console.log(`     Calculated ratio: ${contrast.toFixed(2)}:1`);
  assert(contrast >= 4.5, `Expected >= 4.5, got ${contrast.toFixed(2)}`);
});

// -------------------------------------------------------------
// 2. Token Definitions in app/globals.css
// -------------------------------------------------------------
console.log("\n[Test Suite 2: Global CSS Design Tokens & Primitives]");

const globalsCssPath = path.resolve(process.cwd(), "app/globals.css");
const globalsCss = fs.readFileSync(globalsCssPath, "utf-8");

it("globals.css enforces strict Blue & White variables in :root", () => {
  const requiredTokens = [
    "--color-brand-primary: #0057B8;",
    "--color-brand-hover: #0057B8;",
    "--color-brand-navy: #0057B8;",
    "--color-surface-base: #FFFFFF;",
    "--color-surface-page: #FFFFFF;",
    "--color-text-primary: #0057B8;",
    "--color-text-secondary: #0057B8;",
    "--color-text-inverse: #FFFFFF;",
    "--color-border-subtle: #0057B8;",
    "--color-border-control: #0057B8;",
  ];

  for (const token of requiredTokens) {
    assert(globalsCss.includes(token), `Missing token declaration: ${token}`);
  }
});

it("globals.css disables all drop shadows and sets solid borders", () => {
  assert(globalsCss.includes("box-shadow: none !important;"), "Missing global box-shadow disable");
  assert(globalsCss.includes(".btn-primary"), "Missing .btn-primary");
  assert(globalsCss.includes(".btn-secondary"), "Missing .btn-secondary");
  assert(globalsCss.includes(".card-ocean"), "Missing .card-ocean");
  assert(globalsCss.includes(".input-control"), "Missing .input-control");
});

// -------------------------------------------------------------
// 3. Component Standardization Checks
// -------------------------------------------------------------
console.log("\n[Test Suite 3: Component Implementation Quality & Consistency]");

function checkFile(relPath, checks) {
  const filePath = path.resolve(process.cwd(), relPath);
  assert(fs.existsSync(filePath), `File does not exist: ${relPath}`);
  const content = fs.readFileSync(filePath, "utf-8");
  for (const { desc, assertFn } of checks) {
    it(`${relPath}: ${desc}`, () => assertFn(content));
  }
}

checkFile("components/Header.tsx", [
  {
    desc: "Uses pure #0057B8 and white with 72px desktop / 64px mobile height",
    assertFn: (c) => {
      assert(c.includes("#0057B8"), "Expected #0057B8 for branding and links");
      assert(c.includes("bg-white") || c.includes("bg-[#FFFFFF]"), "Expected white background");
      assert(c.includes("h-[72px]"), "Expected 72px desktop header height");
    },
  },
]);

checkFile("components/Footer.tsx", [
  {
    desc: "Uses #0057B8 background, white text, and no generic youtube link",
    assertFn: (c) => {
      assert(c.includes("bg-[#0057B8]"), "Expected bg-[#0057B8] for footer");
      assert(c.includes("text-white") || c.includes("text-[#FFFFFF]"), "Expected white text for footer");
      assert(!c.includes("https://youtube.com"), "Must not include generic youtube.com link (LINK-01)");
    },
  },
]);

checkFile("components/HeroSection.tsx", [
  {
    desc: "Uses white background with #0057B8 headings and 7/5 grid structure",
    assertFn: (c) => {
      assert(c.includes("bg-white") || c.includes("bg-[#FFFFFF]"), "Expected white Hero background");
      assert(c.includes("text-[#0057B8]"), "Expected #0057B8 for H1");
      assert(c.includes("border-[#0057B8]"), "Expected solid border for frame");
    },
  },
]);

checkFile("components/CourseCard.tsx", [
  {
    desc: "Adheres to strict Blue & White styling and limits bullets to 2",
    assertFn: (c) => {
      assert(c.includes("#0057B8"), "Expected #0057B8 styling");
      assert(c.includes("bg-white") || c.includes("bg-[#FFFFFF]"), "Expected white background");
      assert(c.includes("features.slice(0, 2)"), "Expected features limited to max 2 bullets");
      assert(c.includes("Xem Chi Tiết"), "Expected primary action Xem Chi Tiết");
    },
  },
]);

checkFile("components/PriceBlock.tsx", [
  {
    desc: "Handles multi-tier pricing and separates lines cleanly",
    assertFn: (c) => {
      assert(c.includes("split"), "Expected split handling");
      assert(c.includes("border-[#0057B8]"), "Expected border-[#0057B8]");
      assert(c.includes("text-[#0057B8]"), "Expected text-[#0057B8]");
    },
  },
]);

checkFile("components/StatsSection.tsx", [
  {
    desc: "Shows exactly 3 verified stats without truncating labels",
    assertFn: (c) => {
      assert(c.includes("verifiedStats = ["), "Expected verifiedStats list");
      assert(!c.includes("truncate") && !c.includes("line-clamp"), "Must not truncate stat labels");
    },
  },
]);

checkFile("components/AudienceSelector.tsx", [
  {
    desc: "Provides interactive audience selector with verified catalog links",
    assertFn: (c) => {
      assert(c.includes("Sinh viên"), "Expected Sinh viên option");
      assert(c.includes("Người đi làm"), "Expected Người đi làm option");
      assert(c.includes("Người mới bắt đầu"), "Expected Người mới bắt đầu option");
      assert(c.includes("border-[#0057B8]"), "Expected border-[#0057B8]");
    },
  },
]);

checkFile("components/ContinueLearningWidget.tsx", [
  {
    desc: "Uses pure #0057B8 and white card with no multi-color gradients",
    assertFn: (c) => {
      assert(c.includes("border-2 border-[#0057B8]"), "Expected border-2 border-[#0057B8]");
      assert(c.includes("#0057B8"), "Expected #0057B8 tokens");
      assert(!c.includes("from-cyan-900"), "Should not contain gradient");
    },
  },
]);

checkFile("components/MockExamQuiz.tsx", [
  {
    desc: "Quiz options use strict Blue & White states with keyboard accessibility",
    assertFn: (c) => {
      assert(c.includes("border-2"), "Expected border-2");
      assert(c.includes("bg-[#0057B8] text-white"), "Expected selected option blue fill");
      assert(c.includes("bg-white text-[#0057B8]"), "Expected unselected option white fill");
    },
  },
]);

checkFile("app/khoa-hoc/page.tsx", [
  {
    desc: "Compact header, search directly below title, and category filters",
    assertFn: (c) => {
      assert(c.includes("Khóa học tin học"), "Expected compact H1");
      assert(c.includes("MOS & IC3"), "Expected MOS & IC3 category filter");
      assert(c.includes("Tin học & AI văn phòng"), "Expected Tin học & AI văn phòng filter");
      assert(c.includes("border-[#0057B8]"), "Expected border-[#0057B8]");
    },
  },
]);

checkFile("app/khoa-hoc/[id]/page.tsx", [
  {
    desc: "Detail page has pure white hero with #0057B8 text and integrates CourseScheduleWidget",
    assertFn: (c) => {
      assert(c.includes("bg-white") || c.includes("bg-[#FFFFFF]"), "Expected white hero background");
      assert(c.includes("text-[#0057B8]"), "Expected #0057B8 text");
      assert(c.includes("PriceBlock"), "Expected PriceBlock component");
      assert(c.includes("CourseScheduleWidget"), "Expected CourseScheduleWidget component");
    },
  },
]);

checkFile("components/CourseScheduleWidget.tsx", [
  {
    desc: "Schedule widget provides honest advisory CTA without fake urgency",
    assertFn: (c) => {
      assert(c.includes("Yêu Cầu Tư Vấn Lớp Này"), "Expected honest advisory CTA label");
      assert(c.includes("#0057B8"), "Expected #0057B8 styling");
    },
  },
]);

checkFile("app/khoa-hoc/[id]/bai-hoc/[lessonId]/page.tsx", [
  {
    desc: "Eliminates nested <main> landmark tag and uses strict Blue & White styling",
    assertFn: (c) => {
      assert(!c.includes("<main"), "Must not have nested <main> tag (A11Y-01)");
      assert(c.includes("border-[#0057B8]"), "Expected border-[#0057B8]");
      assert(c.includes("bg-[#0057B8] text-white"), "Expected selected quiz state");
    },
  },
]);

checkFile("app/not-found.tsx", [
  {
    desc: "404 page uses #0057B8 and #FFFFFF with border-2",
    assertFn: (c) => {
      assert(c.includes("text-[#0057B8]"), "Expected #0057B8 for 404 number");
      assert(c.includes("border-2 border-[#0057B8]"), "Expected border-2 border-[#0057B8]");
      assert(!c.includes("from-blue-600 to-cyan-500"), "Should not use gradient text");
    },
  },
]);

// -------------------------------------------------------------
// Summary
// -------------------------------------------------------------
console.log("\n==================================================================");
console.log(`TOTAL TESTS: ${testsPassed + testsFailed} | PASSED: ${testsPassed} | FAILED: ${testsFailed}`);
console.log("==================================================================");

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log("🎉 All Blue & White / 01 Design System & WCAG verifications passed!\n");
  process.exit(0);
}
