(function () {
  const config = window.ARCHIVE_SITE_CONFIG || {};

  function getValue(path) {
    return path.split(".").reduce((acc, key) => {
      if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
        return acc[key];
      }
      return "";
    }, config);
  }

  function markPlaceholder(el, placeholderText) {
    el.textContent = placeholderText;
    el.classList.add("placeholder");
  }

  function wireConfigText() {
    document.querySelectorAll("[data-config-text]").forEach((el) => {
      const path = el.getAttribute("data-config-text");
      const fallback = el.getAttribute("data-placeholder") || "[TODO: Add value]";
      const value = getValue(path);

      if (typeof value === "string" && value.trim().length > 0) {
        el.textContent = value;
        el.classList.remove("placeholder");
      } else {
        markPlaceholder(el, fallback);
      }
    });
  }

  function wireConfigLinks() {
    document.querySelectorAll("[data-config-link]").forEach((el) => {
      const key = el.getAttribute("data-config-link");
      const fallback = el.getAttribute("data-link-fallback") || "Link coming soon";
      const url = getValue("links." + key);

      if (typeof url === "string" && /^https?:\/\//i.test(url.trim())) {
        el.setAttribute("href", url.trim());
        el.removeAttribute("aria-disabled");
        el.classList.remove("is-disabled");
        el.removeAttribute("title");
      } else {
        el.setAttribute("href", "#");
        el.setAttribute("aria-disabled", "true");
        el.classList.add("is-disabled");
        el.setAttribute("title", fallback);
        el.addEventListener("click", (event) => {
          event.preventDefault();
        });
      }
    });
  }

  function wireLastUpdatedDates() {
    document.querySelectorAll("[data-last-updated]").forEach((el) => {
      const key = el.getAttribute("data-last-updated");
      const dateValue = getValue("legal.lastUpdated." + key);

      if (typeof dateValue === "string" && dateValue.trim().length > 0) {
        const parsed = new Date(dateValue + "T00:00:00Z");
        if (!Number.isNaN(parsed.getTime())) {
          el.textContent = parsed.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC"
          });
          el.classList.remove("placeholder");
          return;
        }
      }

      markPlaceholder(el, "[TODO: Add last updated date]");
    });
  }

  function setCurrentYear() {
    document.querySelectorAll("[data-current-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  function highlightCurrentNav() {
    const path = window.location.pathname;
    let file = path.substring(path.lastIndexOf("/") + 1);

    if (!file || file.indexOf(".") === -1) {
      file = "index.html";
    }

    document.querySelectorAll("[data-page-link]").forEach((link) => {
      if (link.getAttribute("href") === file || link.getAttribute("href") === "./" + file) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function wireMobileNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-nav]");

    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open");
    });
  }

  wireConfigText();
  wireConfigLinks();
  wireLastUpdatedDates();
  setCurrentYear();
  highlightCurrentNav();
  wireMobileNav();
})();
