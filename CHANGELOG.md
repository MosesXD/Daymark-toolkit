# Changelog

Notable changes to Daymark are recorded here. Dates use the project’s working timeline.

## 2026-11-24

- Added automated regression coverage for the project estimator in `tests/estimator-core.test.cjs` (PR #12).
- Added a GitHub Actions validation workflow for estimator JavaScript syntax and Node.js tests.
- Covered default small-business estimate bounds, package page-count boundaries, adjustment factors, complexity and planning-rate effects, and invalid-input handling.
- Kept estimator calculation logic in `estimator-core.js`, separate from the page interaction layer.
- Documented the fixed TT$6.67 per US$1 planning assumption and clarified that it is not a live FX rate.

## Earlier work

See the repository history and merged pull requests for changes predating this changelog.
