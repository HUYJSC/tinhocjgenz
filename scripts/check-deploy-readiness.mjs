import fs from "node:fs";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const minimumSecureNext = [16, 3, 3];
const currentNext = String(packageJson.dependencies?.next || "0.0.0")
  .replace(/^[^0-9]*/, "")
  .split(".")
  .slice(0, 3)
  .map((part) => Number.parseInt(part, 10) || 0);

function isAtLeast(current, minimum) {
  for (let index = 0; index < minimum.length; index += 1) {
    if ((current[index] || 0) > minimum[index]) return true;
    if ((current[index] || 0) < minimum[index]) return false;
  }
  return true;
}

const checks = [
  {
    ok: isAtLeast(currentNext, minimumSecureNext),
    message: `Next.js >= ${minimumSecureNext.join(".")}`,
    fix: "Run: npm install next@latest eslint-config-next@latest",
  },
  {
    ok: !fs.readFileSync("next.config.ts", "utf8").includes("unoptimized: true"),
    message: "Next Image Optimization is enabled globally",
  },
  {
    ok: fs.readFileSync(".gitignore", "utf8").includes("!.env.example"),
    message: ".env.example can be committed while real .env files stay ignored",
  },
];

let failed = false;
for (const check of checks) {
  console.log(`${check.ok ? "PASS" : "FAIL"}  ${check.message}`);
  if (!check.ok) {
    failed = true;
    if (check.fix) console.log(`      ${check.fix}`);
  }
}

if (failed) {
  console.error("\nDeployment readiness check failed. Resolve the items above before production deploy.");
  process.exit(1);
}

console.log("\nDeployment readiness checks passed.");
