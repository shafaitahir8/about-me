/* Shafai Tahir — static portfolio interactions */
(() => {
  "use strict";

  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeLabel = document.querySelector(".theme-label");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  const setTheme = (theme, persist = true) => {
    root.dataset.theme = theme;
    if (themeLabel) themeLabel.textContent = theme === "dark" ? "Dark" : "Light";
    themeToggle?.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#24231f" : "#f5e9e7");
    if (persist) localStorage.setItem("shafai-theme", theme);
    window.setTimeout(() => window.lucide?.createIcons({ attrs: { "aria-hidden": "true" } }), 0);
  };

  const storedTheme = localStorage.getItem("shafai-theme");
  setTheme(storedTheme || "light", false);
  themeToggle?.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
    document.body.classList.remove("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    const opening = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(opening));
    if (mobileMenu) mobileMenu.hidden = !opening;
    document.body.classList.toggle("menu-open", opening);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", targetId);
    });
  });

  window.addEventListener("scroll", () => header?.classList.toggle("is-scrolled", window.scrollY > 20), { passive: true });

  const revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.13 })
    : null;

  document.querySelectorAll(".reveal").forEach((element) => revealObserver ? revealObserver.observe(element) : element.classList.add("is-visible"));

  const navLinks = [...document.querySelectorAll('.desktop-nav a[href^="#"]')];
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-30% 0px -60%", threshold: 0 });
    document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
  }

  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll("[data-category]");
  filterButtons.forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !visible);
      if (visible) requestAnimationFrame(() => card.classList.add("is-visible"));
    });
  }));

  const form = document.querySelector("[data-contact-form]");
  const formStatus = document.querySelector("[data-form-status]");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = [...form.querySelectorAll("input[required], textarea[required]")];
    fields.forEach((field) => field.classList.toggle("is-invalid", !field.checkValidity()));
    const invalid = fields.find((field) => !field.checkValidity());
    if (invalid) {
      invalid.focus();
      if (formStatus) formStatus.textContent = "Please complete the highlighted fields.";
      return;
    }
    const values = new FormData(form);
    const email = form.dataset.contactEmail || "";
    const subject = encodeURIComponent(`HubSpot project inquiry from ${values.get("name")}`);
    const body = encodeURIComponent(`Name: ${values.get("name")}\nEmail: ${values.get("email")}\n\nProject details:\n${values.get("message")}`);
    if (formStatus) formStatus.textContent = email ? "Opening your email app…" : "Your message is ready in your email app.";
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });

  document.querySelectorAll("input, textarea").forEach((field) => field.addEventListener("input", () => field.classList.remove("is-invalid")));
  window.addEventListener("resize", () => { if (window.innerWidth > 820) closeMenu(); });
  window.lucide?.createIcons({ attrs: { "aria-hidden": "true" } });
})();
