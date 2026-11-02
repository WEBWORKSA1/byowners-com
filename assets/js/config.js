/* ByOwners.com — runtime configuration
 * The contact address is never written in plain text anywhere on the site.
 * It is assembled in memory only when a visitor clicks an email link or submits a form.
 */
(function () {
  var k = ["tyb3diZXc=", "W1nQDFhc2", "bW9jLmxpY"];
  function addr() {
    try { return atob(k.slice().reverse().join("")).split("").reverse().join(""); } catch (e) { return ""; }
  }
  window.BO_CONFIG = {
    contact: addr,                         // function → address (do not render into the DOM)
    formEndpoint: function () {            // FormSubmit AJAX endpoint (no account needed; confirm the activation email once)
      return "https://formsubmit.co/ajax/" + addr();
    },
    partnerUrl: "https://web.works/contact",
    // Donations: PayPal "Donate" link is built at runtime from the hidden address.
    // Optional extra rails — paste your links to show them on /support/ (leave "" to hide):
    donate: {
      paypal: true,
      buyMeACoffee: "",   // e.g. https://www.buymeacoffee.com/yourname
      kofi: "",           // e.g. https://ko-fi.com/yourname
      stripe: "",         // e.g. https://donate.stripe.com/xxxx
      patreon: "",        // e.g. https://www.patreon.com/yourname
      currency: "USD"
    },
    ga4: "",              // optional Google Analytics 4 ID, e.g. G-XXXXXXX (loads only after consent)
    exitIntent: true,
    exitIntentDelayMs: 12000
  };
})();
