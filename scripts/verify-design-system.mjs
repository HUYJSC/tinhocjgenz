import fs from "fs";
import path from "path";
import assert from "assert";

console.log("==================================================================");
console.log("🎨 RUNNING DESIGN SYSTEM & WCAG CONTRAST VERIFICATION SUITE");
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
// Contrast Ratio Calculation helper
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

it("Text Primary (#172B4D) on Surface Base (#FFFFFF) satisfies WCAG AAA (>= 7:1)", () => {
  const contrast = getContrast("#172B4D", "#FFFFFF");
  console.log(`     Calculated ratio: ${contrast.toFixed(2)}:1`);
  assert(contrast >= 7.0, `Expected >= 7.0, got ${contrast.toFixed(2)}`);
});

it("Brand Primary (#0057B8) on Surface Base (#FFFFFF) satisfies WCAG AA (>= 4.5:1)", () => {
  const contrast = getContrast("#0057B8", "#FFFFFF");
  console.log(`     Calculated ratio: ${contrast.toFixed(2)}:1`);
  assert(contrast >= 4.5, `Expected >= 4.5, got ${contrast.toFixed(2)}`);
});

it("Text Secondary (#526581) on Surface Base (#FFFFFF) satisfies WCAG AA (>= 4.5:1)", () => {
  const contrast = getContrast("#526581", "#FFFFFF");
  console.log(`     Calculated ratio: ${contrast.toFixed(2)}:1`);
  assert(contrast >= 4.5, `Expected >= 4.5, got ${contrast.toFixed(2)}`);
});

it("Border Control (#7186A3) on Surface Base (#FFFFFF) satisfies WCAG Non-Text Contrast (>= 3.0:1)", () => {
  const contrast = getContrast("#7186A3", "#FFFFFF");
  console.log(`     Calculated ratio: ${contrast.toFixed(2)}:1`);
  assert(contrast >= 3.0, `Expected >= 3.0, got ${contrast.toFixed(2)}`);
});

it("Brand Navy (#0B2545) with Inverse Text (#FFFFFF) satisfies WCAG AAA (>= 7.0:1)", () => {
  const contrast = getContrast("#0B2545", "#FFFFFF");
  console.log(`     Calculated ratio: ${contrast.toFixed(2)}:1`);
  assert(contrast >= 7.0, `Expected >= 7.0, got ${contrast.toFixed(2)}`);
});

it("Brand Primary (#0057B8) with Inverse Text (#FFFFFF) satisfies WCAG AA (>= 4.5:1)", () => {
  const contrast = getContrast("#0057B8", "#FFFFFF");
  console.log(`     Calculated ratio: ${contrast.toFixed(2)}:1`);
  assert(contrast >= 4.5, `Expected >= 4.5, got ${contrast.toFixed(2)}`);
});

// -------------------------------------------------------------
// 2. Token Definitions in app/globals.css
// -------------------------------------------------------------
console.log("\n[Test Suite 2: Global CSS Design Tokens & Primitives]");

const globalsCssPath = path.resolve(process.cwd(), "app/globals.css");
const globalsCss = fs.readFileSync(globalsCssPath, "utf-8");

it("globals.css contains mandatory Oceanic color variables in :root", () => {
  const requiredTokens = [
    "--color-brand-primary: #0057B8;",
    "--color-brand-hover: #003F88;",
    "--color-brand-active: #00336F;",
    "--color-brand-navy: #0B2545;",
    "--color-surface-base: #FFFFFF;",
    "--color-surface-page: #F4F8FD;",
    "--color-surface-selected: #E8F1FC;",
    "--color-text-primary: #172B4D;",
    "--color-text-secondary: #526581;",
    "--color-text-inverse: #FFFFFF;",
    "--color-border-subtle: #D8E4F2;",
    "--color-border-control: #7186A3;",
    "--color-focus-ring: #0057B8;",
    "--color-disabled-background: #E7EDF5;",
    "--color-disabled-text: #66758A;",
  ];

  for (const token of requiredTokens) {
    assert(globalsCss.includes(token), `Missing token declaration: ${token}`);
  }
});

it("globals.css defines standard button, card, and input classes", () => {
  assert(globalsCss.includes(".btn-primary"), "Missing .btn-primary");
  assert(globalsCss.includes(".btn-secondary"), "Missing .btn-secondary");
  assert(globalsCss.includes(".btn-tertiary"), "Missing .btn-tertiary");
  assert(globalsCss.includes(".card-ocean"), "Missing .card-ocean");
  assert(globalsCss.includes(".input-control"), "Missing .input-control");
  assert(globalsCss.includes("min-height: 48px;"), "Missing 48px touch target on buttons/controls");
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
    desc: "Uses Brand Navy (#0B2545) and Brand Primary (#0057B8) branding",
    assertFn: (c) => {
      assert(c.includes("#0B2545"), "Expected #0B2545 for logo/text");
      assert(c.includes("#0057B8"), "Expected #0057B8 for brand highlights/CTA");
    },
  },
  {
    desc: "Active navigation uses selected surface #E8F1FC and primary text #0057B8",
    assertFn: (c) => {
      assert(c.includes("#E8F1FC"), "Expected #E8F1FC for active link background");
      assert(c.includes("#D8E4F2"), "Expected subtle border #D8E4F2 for header and dropdowns");
    },
  },
]);

checkFile("components/Footer.tsx", [
  {
    desc: "Uses Brand Navy #0B2545 and eliminates slate-950",
    assertFn: (c) => {
      assert(c.includes("#0B2545"), "Expected brand navy #0B2545 for footer background");
      assert(!c.includes("bg-slate-950"), "Footer should not use bg-slate-950");
    },
  },
  {
    desc: "Provides accessible contrast text #D8E4F2 and #FFFFFF",
    assertFn: (c) => {
      assert(c.includes("#D8E4F2"), "Expected #D8E4F2 for footer body links");
    },
  },
]);

checkFile("components/HeroSection.tsx", [
  {
    desc: "Uses clean surface page #F4F8FD with subtle border #D8E4F2",
    assertFn: (c) => {
      assert(c.includes("#F4F8FD"), "Expected #F4F8FD for Hero background");
      assert(c.includes("#D8E4F2"), "Expected #D8E4F2 for Hero border");
    },
  },
  {
    desc: "Headings use #0B2545 and primary brand highlight #0057B8",
    assertFn: (c) => {
      assert(c.includes("#0B2545"), "Expected #0B2545 for H1");
      assert(c.includes("#0057B8"), "Expected #0057B8 for highlighted text");
    },
  },
]);

checkFile("components/CourseCard.tsx", [
  {
    desc: "Uses unified oceanic tag bg #E8F1FC and primary brand #0057B8",
    assertFn: (c) => {
      assert(c.includes("#E8F1FC"), "Expected tag background #E8F1FC");
      assert(c.includes("#0057B8"), "Expected button/icon #0057B8");
      assert(c.includes("#D8E4F2"), "Expected subtle border #D8E4F2");
    },
  },
]);

checkFile("components/ContinueLearningWidget.tsx", [
  {
    desc: "Replaces dark cyan gradient with clean white card and oceanic tokens",
    assertFn: (c) => {
      assert(c.includes("#D8E4F2"), "Expected subtle border #D8E4F2");
      assert(c.includes("#0057B8"), "Expected brand primary #0057B8");
      assert(c.includes("#0B2545"), "Expected navy heading #0B2545");
      assert(!c.includes("from-cyan-900"), "Should not contain from-cyan-900 gradient");
    },
  },
]);

checkFile("components/MockExamQuiz.tsx", [
  {
    desc: "Option selection uses #E8F1FC and #0057B8 with clear focus rings",
    assertFn: (c) => {
      assert(c.includes("#E8F1FC"), "Expected selected background #E8F1FC");
      assert(c.includes("#0057B8"), "Expected border/accent #0057B8");
      assert(c.includes("#7186A3"), "Expected control border #7186A3");
    },
  },
]);

checkFile("app/khoa-hoc/page.tsx", [
  {
    desc: "Course catalog uses #F4F8FD page surface and #7186A3 control borders",
    assertFn: (c) => {
      assert(c.includes("#F4F8FD"), "Expected page background #F4F8FD");
      assert(c.includes("#7186A3"), "Expected input border #7186A3");
      assert(c.includes("#0057B8"), "Expected active category #0057B8");
    },
  },
]);

checkFile("app/khoa-hoc/[id]/bai-hoc/[lessonId]/page.tsx", [
  {
    desc: "Lesson player uses white header with #D8E4F2 border and #0B2545 title",
    assertFn: (c) => {
      assert(c.includes("#0B2545"), "Expected #0B2545 for lesson title");
      assert(c.includes("#D8E4F2"), "Expected #D8E4F2 for header border");
      assert(c.includes("#0057B8"), "Expected #0057B8 for active syllabus and buttons");
    },
  },
]);

checkFile("app/not-found.tsx", [
  {
    desc: "404 page uses #0057B8 for error code and clean oceanic styling",
    assertFn: (c) => {
      assert(c.includes("#0057B8"), "Expected #0057B8 for 404 number");
      assert(c.includes("#0B2545"), "Expected #0B2545 for title");
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
  console.log("🎉 All Design System & WCAG contrast verifications passed!\n");
  process.exit(0);
}
