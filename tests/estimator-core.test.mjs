import test from "node:test";
import assert from "node:assert/strict";
import estimator from "../estimator-core.js";

const calculate = overrides => estimator.calculateEstimate({
  base: 4750,
  pages: 5,
  minPages: 3,
  maxPages: 5,
  complexity: 1,
  rate: 250,
  copy: false,
  responsive: false,
  rush: false,
  ...overrides
});

test("small-business default estimate matches the published planning baseline", () => {
  assert.deepEqual(calculate(), { low: 4038, high: 5700, midpoint: 4750 });
});

test("starter baseline keeps its one-page range", () => {
  assert.deepEqual(calculate({ base: 2400, pages: 1, minPages: 1, maxPages: 1 }), {
    low: 2040, high: 2880, midpoint: 2400
  });
});

test("page count adjusts the planning midpoint outside the included range", () => {
  assert.equal(calculate({ pages: 1 }).midpoint, 3990);
  assert.equal(calculate({ pages: 12 }).midpoint, 7410);
});

test("complexity, add-ons and rush delivery are applied together", () => {
  assert.deepEqual(calculate({ complexity: 1.3, copy: true, responsive: true, rush: true }), {
    low: 7464, high: 10538, midpoint: 8781
  });
});

test("planning rate is bounded at the documented lower and upper multipliers", () => {
  assert.equal(calculate({ rate: 50 }).midpoint, 3563);
  assert.equal(calculate({ rate: 1000 }).midpoint, 7125);
});

test("invalid baselines, page counts, complexity and rates are rejected", () => {
  assert.throws(() => calculate({ base: 0 }), RangeError);
  assert.throws(() => calculate({ pages: 0 }), RangeError);
  assert.throws(() => calculate({ pages: 2.5 }), RangeError);
  assert.throws(() => calculate({ minPages: 5, maxPages: 3 }), RangeError);
  assert.throws(() => calculate({ complexity: 0 }), RangeError);
  assert.throws(() => calculate({ rate: -1 }), RangeError);
});
