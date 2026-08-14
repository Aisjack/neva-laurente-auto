// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

function closeMenu() {
  primaryNav?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
}

menuButton?.addEventListener("click", () => {
  const willOpen = !primaryNav?.classList.contains("is-open");
  primaryNav?.classList.toggle("is-open", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
});

primaryNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

// Demonstration lead form. Replace this handler with the approved form service.
const leadForm = document.querySelector("#lead-form");
const successMessage = document.querySelector("#form-success");

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  leadForm.reset();
  successMessage.hidden = false;
  successMessage.focus?.();
});
