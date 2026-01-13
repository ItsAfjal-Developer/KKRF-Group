(function () {
    function domReady(fn) {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fn);
      } else {
        fn();
      }
    }
  
    domReady(() => {
      /* ================= SAFE QUERY ================= */
      const mobileNav = document.getElementById("mobileNav");
      const hamburger =
        document.querySelector(".hamburger") ||
        document.querySelector(".menu-toggle");
  
      /* ========= MOBILE NAV FIX ========= */
      if (mobileNav && hamburger) {
        function openMenu() {
          mobileNav.classList.add("active");
          mobileNav.setAttribute("aria-hidden", "false");
  
          const firstLink = mobileNav.querySelector("a, button");
          if (firstLink) firstLink.focus();
        }
  
        function closeMenu() {
          // 🔥 MOST IMPORTANT FIX (focus removal)
          const focused = mobileNav.querySelector(":focus");
          if (focused) focused.blur();
  
          mobileNav.classList.remove("active");
          mobileNav.setAttribute("aria-hidden", "true");
          hamburger.focus();
        }
  
        hamburger.addEventListener("click", () => {
          mobileNav.classList.contains("active")
            ? closeMenu()
            : openMenu();
        });
  
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && mobileNav.classList.contains("active")) {
            closeMenu();
          }
        });
      }
  
      /* ========= SAFE ACTIVE CLASS (NO CRASH) ========= */
      const activeItem = document.querySelector(".tech-item.active");
      if (activeItem) {
        activeItem.classList.add("active");
      }
  
      const currentSpan = document.querySelector(".tech-counter span");
      if (currentSpan) {
        currentSpan.textContent = currentSpan.textContent;
      }
    });
  })();
  
  
  document.addEventListener("DOMContentLoaded", () => {
    // Force browser to calculate layout once
    document.body.offsetHeight;
  
    // Remove any delayed resize / reflow triggers
    window.dispatchEvent(new Event("resize"));
  });