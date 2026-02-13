const header = document.querySelector(".header");
if (!header) return;

const DROPDOWN_OPEN_CLASS = "is-dropdown-open";

const setHeaderState = () => {
  header.classList.toggle(
    DROPDOWN_OPEN_CLASS,
    !!document.querySelector(".dropdown.show")
  );
};

const closeAll = (exceptDropdown = null) => {
  document.querySelectorAll(".dropdown.show").forEach((dd) => {
    if (dd !== exceptDropdown) dd.classList.remove("show");
  });
  setHeaderState();
};

document.addEventListener("click", (e) => {
  const toggle = e.target.closest(".nav-link.dropdown-toggle");
  const clickedInsideDropdown = e.target.closest(".dropdown");

  if (toggle) {
    e.preventDefault();

    const dropdown = toggle.closest(".dropdown");
    const willOpen = !dropdown.classList.contains("show");

    closeAll(dropdown);

    dropdown.classList.toggle("show", willOpen);
    setHeaderState();
    return;
  }

  if (!clickedInsideDropdown) closeAll();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAll();
});

const onScroll = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 10);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
headerNavOpenerClick();
function headerNavOpenerClick() {
  const bodyEl = document.querySelector("body");
  const headerNavOpener = document.querySelector(".js-header__opener");
  if (!bodyEl || !headerNavOpener) {
    return;
  }
  headerNavOpener.addEventListener("click", function () {
    if (!this.classList.contains("is-open")) {
      bodyEl.classList.add("is-nav-open");
      this.classList.add("is-open");
    } else {
      bodyEl.classList.remove("is-nav-open");
      this.classList.remove("is-open");
    }
  });
}
