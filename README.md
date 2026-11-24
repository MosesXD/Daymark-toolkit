# Daymark — Everyday Toolkit

A personal workspace prototype built with HTML, CSS, and vanilla JavaScript.

## Projects and pages
- `index.html`: Official Daymark workspace for daily planning, tasks, lists, focus sessions, quick capture, routines, and workspace views.
- `project-estimator.html`: Separate freelance project-price estimator, also linked from the Official dashboard.
- `concept/`: Separate Concept workspace. Its layout and files are kept independent from Official.

## Official workspace
The workspace includes Today, Inbox, Upcoming, Someday, Logbook, custom lists, a focus timer, quick capture, routines, insights, settings, and data import/export. The mobile sidebar includes close controls.

## Estimator
Choose a project type, page count, complexity, optional add-ons, and an hourly planning rate. The displayed range updates as inputs change, and a summary can be copied. The project baselines are aligned to the Moses' Hub public Starter Website and Small Business Website starting ranges. The estimator can display TTD or USD; USD uses a fixed TT$6.67 per US$1 planning equivalent, not a live exchange-rate feed. Keep this assumption aligned with the Services page when prices change. Calculation rules are isolated in `estimator-core.js` and covered by Node's built-in test runner.

## Development setup
- Use a current Node.js LTS release.
- No package installation is required for the estimator's unit tests; they use Node's built-in test runner.
- Run all estimator tests: `node --test tests/*.test.mjs`.
- Check estimator script syntax: `node --check estimator-core.js && node --check estimator.js`.
- Open `index.html` or `project-estimator.html` in a modern browser for local manual review.
- Keep calculation rules in `estimator-core.js`; keep DOM events and presentation in `estimator.js`; keep visual styling in `estimator.css`.
- When changing pricing assumptions, update the Services alignment note, tests, and changelog together.

## Validation
GitHub Actions validates estimator JavaScript syntax and runs the estimator regression tests on pull requests and pushes covered by the workflow. Passing automated checks does not replace browser testing of the slider, currency toggle, copy action, responsive layout, and keyboard accessibility.

## Limitations
Workspace data is stored in this browser and is not synced to an account or cloud service. Integrations are interface/demo functionality, not live email, calendar, or health connections. The estimator uses editable demo assumptions, not a market-validated pricing model; it does not account for every tax, expense, revision, legal term, or client circumstance. Confirm project scope before quoting. Browser and mobile testing should be completed before presenting the site as client-ready.

## Future improvements
Editable pricing assumptions, saved estimates, print/export, accessibility checks, broader workspace regression coverage, and user testing.
