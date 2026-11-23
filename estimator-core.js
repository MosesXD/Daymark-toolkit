(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.DaymarkEstimator = api;
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  "use strict";

  function calculateEstimate(input) {
    const base = Number(input.base);
    const pages = Number(input.pages);
    const minPages = Number(input.minPages);
    const maxPages = Number(input.maxPages);
    const complexity = Number(input.complexity);
    const rate = Number(input.rate);

    if (!Number.isFinite(base) || base <= 0) throw new RangeError("Project baseline must be positive.");
    if (!Number.isInteger(pages) || pages < 1) throw new RangeError("Page count must be a positive whole number.");
    if (!Number.isInteger(minPages) || !Number.isInteger(maxPages) || minPages < 1 || maxPages < minPages) {
      throw new RangeError("Project page bounds are invalid.");
    }
    if (!Number.isFinite(complexity) || complexity <= 0) throw new RangeError("Complexity must be positive.");
    if (!Number.isFinite(rate) || rate < 0) throw new RangeError("Planning rate must be zero or greater.");

    const pageDelta = pages < minPages ? pages - minPages : pages > maxPages ? pages - maxPages : 0;
    const pageFactor = Math.max(0.65, 1 + pageDelta * 0.08);
    const extras = (input.copy ? 500 : 0) + (input.responsive ? 350 : 0);
    const rush = input.rush ? 1.25 : 1;
    const rateFactor = rate > 0 ? Math.max(0.75, Math.min(1.5, rate / 250)) : 1;
    const midpoint = (base * pageFactor * complexity + extras) * rush * rateFactor;

    return {
      low: Math.round(midpoint * 0.85),
      high: Math.round(midpoint * 1.2),
      midpoint: Math.round(midpoint)
    };
  }

  return Object.freeze({ calculateEstimate });
});
