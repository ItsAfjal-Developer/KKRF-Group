// Mobile Toggle + Dropdowns
document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector(".nav-toggle");
    const navbar = document.querySelector(".navbar");
    const navMenu = document.querySelector(".nav-menu");
    const overlay = document.querySelector(".mobile-menu-overlay");
    const dropdownToggles = document.querySelectorAll(".nav-item.dropdown > a");

    // Toggle Mobile Menu
    navToggle.addEventListener("click", function () {
        navbar.classList.toggle("nav-open");
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close Menu When Clicking Overlay
    overlay.addEventListener("click", function () {
        navbar.classList.remove("nav-open");
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
    });

    // Mobile Dropdown
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener("click", function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentElement.classList.toggle("is-open");
            }
        });
    });

    // Close Menu When Clicking a Link
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                navbar.classList.remove("nav-open");
                navToggle.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    });
});


// Root Close Button Logic
document.querySelectorAll('.back-btn[data-close="true"]').forEach(btn => {
    btn.addEventListener("click", () => {
        document.body.classList.remove("menu-open");

        const toggle = document.querySelector(".nav-toggle");
        if (toggle) toggle.classList.remove("active");
    });
});


// ====== MOBILE NAV JS ======
(function () {
    const body = document.body;
    const toggleBtn = document.querySelector(".nav-toggle");
    const mobileNav = document.querySelector(".mobile-nav");
    const panels = document.querySelectorAll(".mobile-nav-panel");

    if (!toggleBtn || !mobileNav || panels.length === 0) return;

    // Helper: Show Specific Panel by Data-Menu Value
    const showPanel = (menuName) => {
        panels.forEach((p) => p.classList.remove("is-active"));
        const target = mobileNav.querySelector(`[data-menu="${menuName}"]`);
        if (target) target.classList.add("is-active");
    };

    // Toggle Open / Close Full Menu
    toggleBtn.addEventListener("click", () => {
        const isOpen = body.classList.toggle("menu-open");
        toggleBtn.classList.toggle("active", isOpen);

        if (!isOpen) {
            showPanel("root");
        }
    });

    mobileNav.querySelectorAll(".has-children").forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-target");
            if (!target) return;
            showPanel(target);
        });
    });

    // BACK BUTTONS
    mobileNav.querySelectorAll(".back-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const backTo = btn.getAttribute("data-back");
            if (!backTo) return;
            showPanel(backTo);
        });
    });

    // Close menu
    mobileNav.querySelectorAll("a.mobile-nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            body.classList.remove("menu-open");
            toggleBtn.classList.remove("active");
            showPanel("root");
        });
    });
})();


// ====== DESKTOP SERVICES MEGA MENU LOGIC ======
document.addEventListener("DOMContentLoaded", function () {
    const sidebarItems = document.querySelectorAll(".services-sidebar .service-item");
    const servicePanels = document.querySelectorAll(".services-content .service-detail");

    if (!sidebarItems.length || !servicePanels.length) return;

    // --- INIT: Only Active Panel View ---
    const initialActive = document.querySelector(".services-content .service-detail.active");
    servicePanels.forEach((panel) => {
        if (panel === initialActive) {
            panel.style.display = "block";
        } else {
            panel.style.display = "none";
        }
    });

    // --- CLICK HANDLER ---
    sidebarItems.forEach((item) => {
        item.addEventListener("click", () => {
            const targetKey = item.getAttribute("data-service");

            // 1) sidebar active state
            sidebarItems.forEach((li) => li.classList.remove("active"));
            item.classList.add("active");

            // 2) right side content switch
            servicePanels.forEach((panel) => {
                if (panel.getAttribute("data-service") === targetKey) {
                    panel.classList.add("active");
                    panel.style.display = "block";
                } else {
                    panel.classList.remove("active");
                    panel.style.display = "none";
                }
            });
        });
    });
});


// ===== DESKTOP DROPDOWN HOVER =====
document.addEventListener("DOMContentLoaded", function () {
    const desktopDropdowns = document.querySelectorAll(
        ".desktop-nav .nav-item.dropdown"
    );

    desktopDropdowns.forEach((dropdown) => {
        const menu = dropdown.querySelector(".dropdown-menu");
        if (!menu) return;

        let hideTimer;

        const openMenu = () => {
            clearTimeout(hideTimer);
            dropdown.classList.add("is-open");
        };

        const scheduleClose = () => {
            hideTimer = setTimeout(() => {
                dropdown.classList.remove("is-open");
            }, 180);
        };

        dropdown.addEventListener("mouseenter", openMenu);
        dropdown.addEventListener("mouseleave", scheduleClose);

        menu.addEventListener("mouseenter", openMenu);
        menu.addEventListener("mouseleave", scheduleClose);
    });
});


// CTA Click to Open Form
document.querySelector('.cta-button')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.add('show-mobile-form');
});

document.querySelector('[data-form-close]')?.addEventListener('click', () => {
    document.body.classList.remove('show-mobile-form');
});

document.querySelector('.hero-form-overlay')?.addEventListener('click', () => {
    document.body.classList.remove('show-mobile-form');
});

if (window.innerWidth <= 768) {
    setTimeout(() => {
        document.body.classList.add('show-mobile-form');
    }, 12000); // 12s
}


// Video Scroll On Responsive 
document.addEventListener("DOMContentLoaded", function () {
    const hero = document.querySelector(".hero");
    const heroText = document.querySelector(".hero-text");
    const videoWrap = document.querySelector(".hero-mobile-video-wrapper");

    if (!hero || !heroText || !videoWrap) return;

    let state = "above"; // "Above" | "Sticky" | "Locked"

    function setState(next) {
        if (next === state) return;
        state = next;

        if (next === "above") {
            heroText.classList.remove("is-sticky");
            hero.classList.remove("video-locked");
            // Video Normal Scroll
            videoWrap.style.position = "relative";
            videoWrap.style.top = "auto";
        }

        if (next === "sticky") {
            heroText.classList.add("is-sticky");
            hero.classList.remove("video-locked");
            videoWrap.style.position = "relative";
            videoWrap.style.top = "auto";
        }

        if (next === "locked") {
            heroText.classList.add("is-sticky");
            hero.classList.add("video-locked");

            // Yaha se hum Video Rok Rahe Hain
            videoWrap.style.position = "sticky";
            videoWrap.style.top = "140px";
        }
    }

    function handleScroll() {
        // Desktop par Kuch Nahi, Normal Layout
        if (window.innerWidth > 768) {
            setState("above");
            return;
        }

        const heroRect = hero.getBoundingClientRect();

        // Section Viewport ke Bahar → Reset
        if (heroRect.bottom <= 0 || heroRect.top >= window.innerHeight) {
            setState("above");
            return;
        }

        const heroAtTop = heroRect.top <= 0;
        if (!heroAtTop) {
            setState("above");
            return;
        }

        const textRect = heroText.getBoundingClientRect();
        const videoRect = videoWrap.getBoundingClientRect();

        // Jahan Video ko text ke Neeche Lock Karna hai
        const lockPoint = textRect.bottom + 4;

        if (videoRect.top > lockPoint) {
            setState("sticky");
        } else {
            setState("locked");
        }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
});


// Start Introduction Section Bar
document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".trusted-section");
    if (!section) return;

    const items = section.querySelectorAll(".ts-item");
    const details = section.querySelectorAll(".ts-detail");
    const layout = section.querySelector(".ts-layout");
    const list = section.querySelector(".ts-list");
    const detailPanel = section.querySelector(".ts-detail-panel");

    // Desktop ke liye Starting State = S1 Active
    function setDesktopDefault() {
        items.forEach((i) => i.classList.remove("ts-item--active"));
        details.forEach((d) => d.classList.remove("ts-detail--active"));

        const firstItem = section.querySelector('.ts-item[data-service="s1"]');
        const firstDetail = section.querySelector('.ts-detail[data-service="s1"]');

        firstItem.classList.add("ts-item--active");
        firstDetail.classList.add("ts-detail--active");

        if (detailPanel.parentNode !== layout) {
            layout.appendChild(detailPanel);
        }
    }

    // Mobile: Sab Closed by Default
    function setMobileDefault() {
        items.forEach((i) => i.classList.remove("ts-item--active"));
        details.forEach((d) => d.classList.remove("ts-detail--active"));

        // Detail Panel ko List ke End me Hide Rakhna
        if (detailPanel.parentNode !== list) {
            list.appendChild(detailPanel);
        }
        detailPanel.style.display = "none";
    }

    // Detect Mode (Desktop or Mobile)
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Click Handler
    items.forEach((item) => {
        item.addEventListener("click", () => {
            const serviceId = item.getAttribute("data-service");
            const detail = section.querySelector(`.ts-detail[data-service="${serviceId}"]`);

            // MOBILE BEHAVIOR
            if (isMobile()) {
                // If Same Item Clicked Again → Close It
                if (item.classList.contains("ts-item--active")) {
                    item.classList.remove("ts-item--active");
                    detail.classList.remove("ts-detail--active");
                    detailPanel.style.display = "none";
                    return;
                }

                // Close all First
                items.forEach((i) => i.classList.remove("ts-item--active"));
                details.forEach((d) => d.classList.remove("ts-detail--active"));

                // Open Clicked
                item.classList.add("ts-item--active");
                detail.classList.add("ts-detail--active");

                // Move Detail Panel below Clicked Item
                list.insertBefore(detailPanel, item.nextSibling);
                detailPanel.style.display = "block";
                return;
            }

            // DESKTOP BEHAVIOR
            items.forEach((i) => i.classList.remove("ts-item--active"));
            details.forEach((d) => d.classList.remove("ts-detail--active"));

            item.classList.add("ts-item--active");
            detail.classList.add("ts-detail--active");

            if (detailPanel.parentNode !== layout) {
                layout.appendChild(detailPanel);
            }
            detailPanel.style.display = "block";
        });
    });

    // On Load
    if (isMobile()) {
        setMobileDefault();
    } else {
        setDesktopDefault();
    }

    // On Resize, Reapply Behavior
    window.addEventListener("resize", () => {
        if (isMobile()) {
            setMobileDefault();
        } else {
            setDesktopDefault();
        }
    });

});


// Starts Stat Section Bar
document.addEventListener("DOMContentLoaded", function () {
    const statsSection = document.querySelector(".stats");
    if (!statsSection) return;

    const statNumbers = statsSection.querySelectorAll(".stat-number");
    let hasAnimated = false;

    function animateNumber(el, duration) {
        const fullText = el.textContent.trim();
        const numericPart = fullText.replace(/[^\d]/g, "");
        const suffix = fullText.replace(/[\d]/g, "");

        const target = parseInt(numericPart, 10);
        if (isNaN(target)) return;

        const startTime = performance.now();

        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(target * progress);

            el.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // --------- INTERSECTION OBSERVER ---------
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    statNumbers.forEach((el) => animateNumber(el, 1200));
                    observer.disconnect();
                }
            });
        }, {
        threshold: 0.3,
    }
    );

    observer.observe(statsSection);

    // --------- SMOOTH SCROLL FOR CTA ---------
    const cta = statsSection.querySelector(".stats-cta");
    if (cta) {
        cta.addEventListener("click", function (e) {
            const href = cta.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            const targetEl = document.querySelector(href);
            if (!targetEl) return;

            e.preventDefault();
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }
});


// Start Technologies Section Bar
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".tech-accordion-item");
    const headers = document.querySelectorAll(".tech-accordion-header");
    const images = document.querySelectorAll(".visual-image");
    const currentSpan = document.querySelector(".current-index");
    const totalSpan = document.querySelector(".total-count");

    // Set total slide count
    if (totalSpan) totalSpan.textContent = String(images.length).padStart(2, "0");

    // FUNCTION: Activate tech item
    function activateTech(tech, allowClose = false) {
        const activeItem = document.querySelector('.tech-accordion-item[data-tech="' + tech + '"]');

        // MOBILE — If Clicking Active → Close it
        if (allowClose && window.innerWidth <= 768 && activeItem.classList.contains("active")) {
            activeItem.classList.remove("active");
            return;
        }

        // Remove Active Everywhere
        items.forEach(i => i.classList.remove("active"));
        images.forEach(img => img.classList.remove("active"));

        // Apply Active
        activeItem.classList.add("active");
        const img = document.querySelector('.visual-image[data-visual="' + tech + '"]');
        if (img) img.classList.add("active");

        if (currentSpan) currentSpan.textContent = String(tech).padStart(2, "0");
    }

    // Header Click
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const parent = header.closest(".tech-accordion-item");
            const tech = parent.getAttribute("data-tech");

            // Mobile Toggle Allowed
            activateTech(tech, true);

            if (window.innerWidth <= 768) {
                parent.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    if (window.innerWidth > 768) {
        // Desktop → Open item 01
        activateTech("1");
    } else {
        // Mobile → All Closed
        items.forEach(i => i.classList.remove("active"));
    }
});


// Start Success Stories Bar
document.addEventListener("DOMContentLoaded", function () {
    // Slider Elements
    const slides = document.querySelectorAll(".case-slide");
    const prevBtn = document.querySelector(".case-prev");
    const nextBtn = document.querySelector(".case-next");
    const dotsContainer = document.querySelector(".case-dots");

    if (!slides.length) return;

    let currentIndex = 0;

    // ---------- Create Dots Dynamically (If not Already in HTML) ----------
    let dots = [];
    if (dotsContainer) {
        dotsContainer.innerHTML = "";
        slides.forEach((_, index) => {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });
    }

    // ---------- Helpers ----------
    function showSlide(index) {
        // Wrap Index
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentIndex = index;

        // Update Slides
        slides.forEach((slide, i) => {
            slide.classList.toggle("is-active", i === currentIndex);
        });

        // Update Dots
        if (dots.length) {
            dots.forEach((dot, i) => {
                dot.classList.toggle("is-active", i === currentIndex);
            });
        }
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // ---------- Button Events ----------
    if (nextBtn) {
        nextBtn.addEventListener("click", nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", prevSlide);
    }

    // ---------- Dot Click Events ----------
    if (dots.length) {
        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                const index = parseInt(dot.dataset.index, 10);
                showSlide(index);
            });
        });
    }

    // ---------- Keyboard Support (Optional) ----------
    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
    });

    // ---------- Init (First Slide Active) ----------
    showSlide(0);
});


// <!-- Simple JS for Tab Switching-->
document.addEventListener("DOMContentLoaded", function () {
    const techSection = document.querySelector(".android-tech-section");
    if (!techSection) return;

    const tabs = techSection.querySelectorAll(".ats-tab-btn");
    const panels = techSection.querySelectorAll(".ats-panel");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = tab.getAttribute("data-tab");

            // Tabs State
            tabs.forEach((t) => t.classList.remove("ats-tab-btn--active"));
            tab.classList.add("ats-tab-btn--active");

            // Panels State
            panels.forEach((panel) => {
                const match = panel.getAttribute("data-tab") === target;
                panel.classList.toggle("ats-panel--active", match);
            });
        });
    });
});


// Start Android Stack Stories Bar
document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".android-stack-section");
    if (!section) return;

    const items = section.querySelectorAll(".android-stack-item");

    function closeAll() {
        items.forEach((item) => {
            item.classList.remove("android-stack-item--active");

            const content = item.querySelector(".android-stack-content");
            const icon = item.querySelector(".android-stack-toggle-icon");

            if (content) content.classList.remove("android-stack-content--show");
            if (icon) icon.style.transform = "rotate(0deg)";
        });
    }

    items.forEach((item) => {
        const header = item.querySelector(".android-stack-header-item");
        const content = item.querySelector(".android-stack-content");
        const icon = item.querySelector(".android-stack-toggle-icon");

        if (!header || !content) return;

        header.addEventListener("click", () => {
            const isActive = item.classList.contains("android-stack-item--active");

            closeAll();

            if (isActive) return;

            item.classList.add("android-stack-item--active");
            content.classList.add("android-stack-content--show");
            if (icon) icon.style.transform = "rotate(180deg)";
        });
    });

    // Default: First Open
    const first = items[0];
    if (first) {
        first.classList.add("android-stack-item--active");
        const content = first.querySelector(".android-stack-content");
        const icon = first.querySelector(".android-stack-toggle-icon");
        if (content) content.classList.add("android-stack-content--show");
        if (icon) icon.style.transform = "rotate(180deg)";
    }
});



// Start Android Faq Item Bar
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".android-faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".android-faq-question");
        const answer = item.querySelector(".android-faq-answer");

        question.addEventListener("click", () => {

            // Close all other FAQ items
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                    const otherAnswer = otherItem.querySelector(".android-faq-answer");
                    otherAnswer.style.maxHeight = null;
                }
            });

            // Toggle current FAQ
            item.classList.toggle("active");

            if (item.classList.contains("active")) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
});


// Start Bi Accordation Bar 
document.querySelectorAll(".bi-accordion-header").forEach(header => {
    header.addEventListener("click", () => {
        const item = header.parentElement;
        const content = item.querySelector(".bi-accordion-content");
        const icon = header.querySelector(".bi-accordion-icon");

        const isOpen = content.classList.contains("active");

        // Close all
        document.querySelectorAll(".bi-accordion-content").forEach(c => c.classList.remove("active"));
        document.querySelectorAll(".bi-accordion-icon").forEach(i => i.classList.remove("active"));

        // Open this item (only if not already open)
        if (!isOpen) {
            content.classList.add("active");
            icon.classList.add("active");
        }
    });
});



// Start Pop Up Bar
const epOverlay = document.getElementById("exitPopupOverlay");
const epCloseBtn = document.getElementById("closePopup");
const epScheduleBtn = document.getElementById("epScheduleBtn");

// ------------------------------ SHOW POPUP FUNCTION ------------------------------  // 
function showExitPopup() {
    epOverlay.classList.add("active");
}

// ------------------------------ HIDE POPUP FUNCTION ------------------------------ //
function hideExitPopup() {
    epOverlay.classList.remove("active");
}

// ------------------------------ CLOSE POPUP ON CLOSE BUTTON ------------------------------ //
epCloseBtn.addEventListener("click", hideExitPopup);

// ------------------------------ CLOSE POPUP WHEN CLICKING OUTSIDE POPUP ------------------------------ //
epOverlay.addEventListener("click", function (event) {
    if (event.target === epOverlay) {
        hideExitPopup();
    }
});

// ------------------------------ CLOSE POPUP ON ESC KEY PRESS ------------------------------ //
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        hideExitPopup();
    }
});

// ------------------------------ OPTIONAL: EXIT-INTENT TRIGGER ------------------------------ // 
// (PopUp Automatically Opens When User tries to Leave Page)
let popupShown = false;

document.addEventListener("mouseout", function (event) {
    if (!popupShown && event.clientY < 10) {
        showExitPopup();
        popupShown = true;
    }
});

// ------------------------------ FORM BUTTON → KEEP POPUP OPEN OR HANDLE SUBMISSION ------------------------------ //
epScheduleBtn.addEventListener("click", function () {
    alert("Your consultation request has been submitted!");
    hideExitPopup();
});

//GSAP

