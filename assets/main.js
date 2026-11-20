// Mobile navigation
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  });
}

// Reveal sections as they scroll into view
const io = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("seen"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 })
  : null;
document.querySelectorAll(".on-scroll").forEach((el) => (io ? io.observe(el) : el.classList.add("seen")));

// News & events filter
const filterBar = document.querySelector(".filters");
if (filterBar) {
  const items = document.querySelectorAll("[data-cat]");
  const empty = document.querySelector(".empty");
  filterBar.addEventListener("click", (ev) => {
    const btn = ev.target.closest("button");
    if (!btn) return;
    filterBar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    const cat = btn.dataset.filter;
    let shown = 0;
    items.forEach((it) => {
      const match = cat === "all" || it.dataset.cat === cat;
      it.hidden = !match;
      if (match) shown++;
    });
    if (empty) empty.style.display = shown ? "none" : "block";
  });
}

// Footer year
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
