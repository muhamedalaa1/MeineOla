document.addEventListener("DOMContentLoaded", () => {
  if (!window.gsap) {
    console.warn("GSAP could not be loaded. The page will use its CSS fallbacks.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  // Keep the experience calm and accessible when the visitor requests less motion.
  if (reduceMotion) {
    gsap.set([".cursor", ".overlay"], { clearProps: "all" });
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    return;
  }

  // Custom cursor: quickTo avoids creating a new tween on every mouse event.
  const cursor = document.querySelector(".cursor");
  if (cursor && !isTouch) {
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0.7, opacity: 0 });
    const moveX = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const moveY = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

    window.addEventListener("pointermove", (event) => {
      moveX(event.clientX);
      moveY(event.clientY);
      gsap.to(cursor, { opacity: 1, duration: 0.2, overwrite: "auto" });
    }, { passive: true });

    document.addEventListener("pointerleave", () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    });

    document.querySelectorAll("a, button, .cardInner, .clientInner").forEach((item) => {
      item.addEventListener("pointerenter", () => gsap.to(cursor, {
        scale: 1.8, duration: 0.25, ease: "power2.out", overwrite: "auto"
      }));
      item.addEventListener("pointerleave", () => gsap.to(cursor, {
        scale: 0.7, duration: 0.25, ease: "power2.out", overwrite: "auto"
      }));
    });
  } else if (cursor) {
    cursor.hidden = true;
  }

  // Navigation overlay.
  const burger = document.querySelector(".burger");
  const overlay = document.querySelector(".overlay");
  const menuItems = gsap.utils.toArray(".menuItem p");
  let menuOpen = false;

  if (burger && overlay) {
    gsap.set(overlay, { clipPath: "inset(0 0 100% 0)", pointerEvents: "none" });
    gsap.set(menuItems, { yPercent: 110, rotate: 3 });

    const menuTimeline = gsap.timeline({
      paused: true,
      defaults: { ease: "power4.inOut" },
      onStart: () => {
        overlay.style.pointerEvents = "auto";
        burger.setAttribute("aria-expanded", "true");
      },
      onReverseComplete: () => {
        overlay.style.pointerEvents = "none";
        burger.setAttribute("aria-expanded", "false");
      }
    });

    menuTimeline
      .to(overlay, { clipPath: "inset(0 0 0% 0)", duration: 0.85 })
      .to(menuItems, {
        yPercent: 0, rotate: 0, duration: 0.8, stagger: 0.09, ease: "power4.out"
      }, "-=0.42");

    const closeMenu = () => {
      if (!menuOpen) return;
      menuOpen = false;
      burger.classList.remove("active");
      menuTimeline.reverse();
    };

    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open navigation menu");
    burger.addEventListener("click", () => {
      menuOpen = !menuOpen;
      burger.classList.toggle("active", menuOpen);
      burger.setAttribute("aria-label", menuOpen ? "Close navigation menu" : "Open navigation menu");
      menuOpen ? menuTimeline.play() : menuTimeline.reverse();
    });

    overlay.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // Hero entrance: one coordinated sequence instead of many disconnected tweens.
  const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
  hero
    .from("nav .logo, nav ul li, nav .burger", {
      y: -28, opacity: 0, duration: 0.75, stagger: 0.1, clearProps: "all"
    })
    .from(".firstHeading h1", {
      yPercent: 22, opacity: 0, duration: 1.05, ease: "power4.out"
    }, "-=0.25")
    .from(".secondRow .imgWrapper", {
      y: 35, scale: 0.94, opacity: 0, duration: 0.85
    }, "-=0.7")
    .from(".secondRow .secondRowPara", {
      y: 24, opacity: 0, duration: 0.65
    }, "-=0.5")
    .from(".bestAgency, .WorldClassAgency, .thirdRowRight", {
      y: 22, opacity: 0, duration: 0.6, stagger: 0.12
    }, "-=0.35");

  // Reusable reveal animation for headings, copy and client marks.
  const reveal = (targets, options = {}) => {
    gsap.fromTo(targets,
      { y: options.y ?? 48, opacity: 0, filter: "blur(7px)" },
      {
        y: 0, opacity: 1, filter: "blur(0px)",
        duration: options.duration ?? 0.9,
        stagger: options.stagger ?? 0.08,
        ease: "power3.out",
        clearProps: "filter",
        scrollTrigger: {
          trigger: options.trigger || targets,
          start: options.start || "top 84%",
          once: true
        }
      }
    );
  };

  reveal(".whatWeDo span", { y: 20, duration: 0.7 });
  reveal(".whatWeDo .allH2 h2", { trigger: ".whatWeDo", y: 55, stagger: 0.12 });
  reveal(".ourCards .mainHeader h2", { trigger: ".ourCards .mainHeader", y: 65, stagger: 0.12 });
  reveal(".morePrrojects .allPara p", { trigger: ".morePrrojects", y: 28, stagger: 0.08 });
  reveal(".whereWeThrive .mainHeader h2", { trigger: ".whereWeThrive .mainHeader", y: 60, stagger: 0.12 });
  reveal(".thrivesAllP p", { trigger: ".thrivesAllP", y: 30, stagger: 0.1 });
  reveal(".clients .mainHeader h2", { trigger: ".clients .mainHeader", y: 60, stagger: 0.12 });
  reveal(".clientsCol", { trigger: ".clients .row", y: 28, stagger: 0.07, duration: 0.75 });

  // Portfolio cards: soft entrance, image depth and a restrained hover lift.
  gsap.utils.toArray(".myCol").forEach((card, index) => {
    const image = card.querySelector("img");
    gsap.fromTo(card,
      { y: 70, opacity: 0, rotate: index % 2 ? 1.5 : -1.5 },
      {
        y: 0, opacity: 1, rotate: 0, duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true }
      }
    );
    if (image) {
      gsap.fromTo(image, { scale: 1.08 }, {
        scale: 1, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true }
      });
    }
    card.addEventListener("pointerenter", () => {
      if (!isTouch) gsap.to(card, { y: -8, duration: 0.35, ease: "power2.out" });
    });
    card.addEventListener("pointerleave", () => {
      if (!isTouch) gsap.to(card, { y: 0, duration: 0.45, ease: "power3.out" });
    });
  });

  // Interactive elastic line. Coordinates are measured relative to the SVG.
  const guitarSection = document.querySelector(".gitarLine");
  const guitarPath = guitarSection?.querySelector("svg path");
  if (guitarSection && guitarPath) {
    const restPath = "M 10 251 Q 600 250 1190 251";
    guitarSection.addEventListener("pointermove", (event) => {
      const bounds = guitarSection.getBoundingClientRect();
      const localX = event.clientX - bounds.left;
      const localY = event.clientY - bounds.top;
      const controlX = gsap.utils.clamp(10, 1190, localX * (1200 / bounds.width));
      const controlY = gsap.utils.clamp(0, 500, localY * (500 / bounds.height));
      gsap.to(guitarPath, {
        attr: { d: `M 10 251 Q ${controlX} ${controlY} 1190 251` },
        duration: 0.35, ease: "power3.out", overwrite: "auto"
      });
    }, { passive: true });
    guitarSection.addEventListener("pointerleave", () => {
      gsap.to(guitarPath, {
        attr: { d: restPath }, duration: 1.1, ease: "elastic.out(1, 0.25)"
      });
    });
  }

  // Seamless marquee. The duplicated content in the HTML creates the loop.
  const marqueeItems = gsap.utils.toArray(".move .inner");
  if (marqueeItems.length) {
    gsap.to(marqueeItems, {
      xPercent: -105, duration: 24, ease: "none", repeat: -1,
      modifiers: { xPercent: gsap.utils.wrap(-105, 0) }
    });
  }

  // Horizontal storytelling is desktop-only; mobile keeps natural vertical flow.
  const races = document.querySelector(".races");
  if (races) {
    ScrollTrigger.matchMedia({
      "(min-width: 900px)": () => {
        const getDistance = () => Math.max(0, races.scrollWidth - window.innerWidth);
        gsap.to(races, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".racesWrapper",
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      },
      "(max-width: 899px)": () => {
        gsap.set(races, { clearProps: "transform" });
      }
    });
  }

  // Gentle depth on the hero background on larger screens.
  if (!isTouch) {
    gsap.to("header", {
      backgroundPositionY: "35%",
      ease: "none",
      scrollTrigger: {
        trigger: "header",
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });
  }

  // Refresh measurements after images have loaded.
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
});
