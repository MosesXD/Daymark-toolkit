(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const formatters = { ttd: new Intl.NumberFormat("en-TT", { style: "currency", currency: "TTD", maximumFractionDigits: 0 }), usd: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) };
  let currency = "ttd";
  const money = value => formatters[currency].format(currency === "usd" ? value / 6.67 : value);
  const currencyButtons = document.querySelectorAll("[data-estimate-currency]");
  currencyButtons.forEach(button => button.addEventListener("click", () => { currency = button.dataset.estimateCurrency; currencyButtons.forEach(item => item.setAttribute("aria-pressed", String(item === button))); calculate(); }));
  const fields = ["projectType", "pages", "complexity", "copy", "responsive", "rush", "rate"];
  const form = $("estimateForm"), message = $("message");
  function calculate() {
    const base = Number($("projectType").value), pages = Number($("pages").value);
    const complexity = Number($("complexity").value), rate = Number($("rate").value);
    const extras = ($("copy").checked ? 500 : 0) + ($("responsive").checked ? 350 : 0);
    const rush = $("rush").checked ? 1.25 : 1;
    const pageFactor = 1 + Math.max(0, pages - 1) * 0.08;
    const rateFactor = rate > 0 ? Math.max(0.75, Math.min(1.5, rate / 250)) : 1;
    const midpoint = (base * pageFactor * complexity + extras) * rush * rateFactor;
    const low = Math.round(midpoint * 0.85), high = Math.round(midpoint * 1.2);
    $("pagesOut").value = String(pages);
    $("estimate").textContent = `${money(low)} – ${money(high)}`;
    $("breakdown").textContent = `Planning midpoint ${money(Math.round(midpoint))} · USD uses a fixed planning equivalent (TT$6.67 per US$1), not a live exchange rate.`;
    return { low, high, midpoint: Math.round(midpoint) };
  }
  fields.forEach(id => $(id).addEventListener("input", () => { message.textContent = ""; calculate(); }));
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const result = calculate();
    const summary = ["Daymark project planning estimate", `Estimated range: ${money(result.low)} – ${money(result.high)}`, `Planning midpoint: ${money(result.midpoint)}`, "Planning estimate only. USD is a fixed planning equivalent, not a live conversion. Confirm scope, revisions, timeline, expenses, and terms before quoting."].join("\n");
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(summary);
      message.textContent = "Estimate summary copied. Review and adjust it before sharing.";
    } catch (error) { message.textContent = summary; }
  });
  calculate();
})();