const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateEstimate } = require("../estimator-core.js");

const baseInput = {
  base: 4750,
  pages: 5,
  minPages: 3,
  maxPages: 5,
  complexity: 1,
  rate: 250,
  copy: false,
  responsive: false,
  rush: false
};

test("matches the published small-business default planning range", () => {
  assert.deepEqual(calculateEstimate(baseInput), {
    low: 4038,
    high: 5700,
    midpoint: 4750
  });
});

test("does not add a page penalty inside the package page range", () => {
  const threePages = calculateEstimate({ ...baseInput, pages: 3 });
  const fivePages = calculateEstimate({ ...baseInput, pages: 5 });
  assert.deepEqual(threePages, fivePages);
});

test("adjusts the estimate for pages outside the package range", () => {
  const below = calculateEstimate({ ...baseInput, pages: 1 });
  const above = calculateEstimate({ ...baseInput, pages: 8 });
  assert.ok(below.midpoint < 4750);
  assert.ok(above.midpoint > 4750);
});

test("applies optional content, responsive QA and rush factors", () => {
  const plain = calculateEstimate(baseInput);
  const enhanced = calculateEstimate({
    ...baseInput,
    copy: true,
    responsive: true,
    rush: true
  });
  assert.ok(enhanced.midpoint > plain.midpoint);
});

test("applies complexity and bounded hourly planning-rate factors", () => {
  const basic = calculateEstimate({ ...baseInput, complexity: 0.85 });
  const advanced = calculateEstimate({ ...baseInput, complexity: 1.3 });
  const highRate = calculateEstimate({ ...baseInput, rate: 500 });
  assert.ok(basic.midpoint < 4750);
  assert.ok(advanced.midpoint > 4750);
  assert.ok(highRate.midpoint > 4750);
});

test("rejects invalid page counts and package bounds", () => {
  assert.throws(() => calculateEstimate({ ...baseInput, pages: 0 }), RangeError);
  assert.throws(() => calculateEstimate({ ...baseInput, pages: 2.5 }), RangeError);
  assert.throws(() => calculateEstimate({ ...baseInput, minPages: 5, maxPages: 3 }), RangeError);
});

test("rejects invalid baselines, complexity and rates", () => {
  assert.throws(() => calculateEstimate({ ...baseInput, base: 0 }), RangeError);
  assert.throws(() => calculateEstimate({ ...baseInput, complexity: 0 }), RangeError);
  assert.throws(() => calculateEstimate({ ...baseInput, rate: -1 }), RangeError);
});
