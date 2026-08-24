"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import SplitText from "@/utlis/splittext";
import gsap, { Back } from "gsap";
import { closeMobilemenu, closeMobilemenu2 } from "@/utlis/toggleMobilemenu";
export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);

  useEffect(() => {
    // Class names for different scroll and animation states
    const RBT_SCROLL_ACTIVATION = "tmp-scroll-trigger";
    const RBT_SCROLL_OFFSCREEN_ACTIVATION = "tmp-scroll-trigger--offscreen";
    const RBT_SCROLL_ZOOM_IN_ACTIVATION = "animate--zoom-in";
    const RBT_SCROLL_CANCEL_ACTIVATION = "tmp-scroll-trigger--cancel";

    // Handle intersection events for scroll animations
    function onIntersection(entries, observer) {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const elementTarget = entry.target;
          if (
            elementTarget.classList.contains(RBT_SCROLL_OFFSCREEN_ACTIVATION)
          ) {
            elementTarget.classList.remove(RBT_SCROLL_OFFSCREEN_ACTIVATION);
            if (elementTarget.dataset.cascade) {
              elementTarget.style.setProperty("--animation-order", index);
            }
          }
          observer.unobserve(elementTarget);
        } else {
          entry.target.classList.add(RBT_SCROLL_OFFSCREEN_ACTIVATION);
          entry.target.classList.remove(RBT_SCROLL_CANCEL_ACTIVATION);
        }
      });
    }

    // Initialize scroll animation triggers
    function initializeScrollAnimationTrigger(
      rootEl = document,
      isDesignModeEvent = false
    ) {
      const animationTriggerElements = rootEl.querySelectorAll(
        `.${RBT_SCROLL_ACTIVATION}`
      );
      if (animationTriggerElements.length === 0) return;

      if (isDesignModeEvent) {
        animationTriggerElements.forEach((element) => {
          element.classList.add("tmp-scroll-trigger--design-mode");
        });
        return;
      }

      const observer = new IntersectionObserver(onIntersection, {
        rootMargin: "0px 0px -50px 0px",
      });
      animationTriggerElements.forEach((element) => {
        observer.observe(element);
      });
    }

    // Calculate the percentage of the element that is visible
    function percentageSeen(element) {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const elementRect = element.getBoundingClientRect();
      const elementPositionY = elementRect.top + scrollY;
      const elementHeight = elementRect.height;

      if (elementPositionY > scrollY + viewportHeight) return 0;
      if (elementPositionY + elementHeight < scrollY) return 100;

      let percentage =
        (scrollY + viewportHeight - elementPositionY) /
        ((viewportHeight + elementHeight) / 100);
      return Math.round(percentage);
    }

    // Throttle the scroll event to improve performance
    function throttle(fn, wait) {
      let time = Date.now();
      return function () {
        if (time + wait - Date.now() < 0) {
          fn();
          time = Date.now();
        }
      };
    }

    // Initialize zoom-in animation triggers
    function initializeScrollZoomAnimationTrigger() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const animationTriggerElements = document.querySelectorAll(
        `.${RBT_SCROLL_ZOOM_IN_ACTIVATION}`
      );
      if (animationTriggerElements.length === 0) return;

      const scaleAmount = 0.2 / 100;
      animationTriggerElements.forEach((element) => {
        let elementIsVisible = false;

        new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            elementIsVisible = entry.isIntersecting;
          });
        }).observe(element);

        element.style.setProperty(
          "--zoom-in-ratio",
          1 + scaleAmount * percentageSeen(element)
        );

        const handleScroll = throttle(() => {
          if (elementIsVisible) {
            element.style.setProperty(
              "--zoom-in-ratio",
              1 + scaleAmount * percentageSeen(element)
            );
          }
        }, 100);

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Cleanup function for this element
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      });
    }

    // Initialize animations and remove initial opacity class from swiper slides
    document.querySelectorAll(".swiper-slide.opacity-0").forEach((element) => {
      element.classList.remove("opacity-0");
    });

    initializeScrollAnimationTrigger();
    initializeScrollZoomAnimationTrigger();

    // Cleanup function for the useEffect
    return () => {
      // Cleanup any ongoing observers or event listeners if needed
      // (implementation would depend on how you track the observers)
    };
  }, [pathname]); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Services Widget Logic
    const servicesWidget = document.querySelector(".services-widget");
    if (servicesWidget) {
      const activeBg = servicesWidget.querySelector(".active-bg");

      function updateActiveService(element) {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const widgetRect = servicesWidget.getBoundingClientRect();
        const topOff = rect.top - widgetRect.top;
        const height = element.offsetHeight;

        const closestServiceItem = element.closest(".service-item");
        if (closestServiceItem) {
          closestServiceItem.classList.remove("mleave");
        }

        servicesWidget.querySelectorAll(".service-item").forEach((item) => {
          if (closestServiceItem !== item) {
            item.classList.add("mleave");
          }
        });

        if (activeBg) {
          activeBg.style.top = `${topOff}px`;
          activeBg.style.height = `${height}px`;
        }
      }

      function handleMouseEnter(e) {
        const serviceItem = e.target.closest(".service-item");
        if (serviceItem) {
          updateActiveService(serviceItem);
        }
      }

      function handleMouseLeave() {
        const currentElement = servicesWidget.querySelector(".current");
        updateActiveService(currentElement);

        servicesWidget.querySelectorAll(".service-item").forEach((item) => {
          if (!currentElement || !item.contains(currentElement)) {
            item.classList.remove("mleave");
          }
        });
      }

      function handleClick(e) {
        const serviceItem = e.target.closest(".service-item");
        if (serviceItem) {
          servicesWidget.querySelectorAll(".service-item").forEach((item) => {
            item.classList.remove("current");
          });
          serviceItem.classList.add("current");
        }
      }

      servicesWidget.addEventListener("mouseenter", handleMouseEnter, true);
      servicesWidget.addEventListener("mouseleave", handleMouseLeave);
      servicesWidget.addEventListener("click", handleClick);

      // Initial call
      updateActiveService(servicesWidget.querySelector(".current"));

      // Card Hover Effect Logic

      return () => {
        // Cleanup services widget events
        servicesWidget.removeEventListener(
          "mouseenter",
          handleMouseEnter,
          true
        );
        servicesWidget.removeEventListener("mouseleave", handleMouseLeave);
        servicesWidget.removeEventListener("click", handleClick);
      };
    }
  }, [pathname]); // Empty dependency array means this runs once on mount
  useEffect(() => {
    const cards = document.querySelectorAll(".tmponhover");
    const handleCardMouseMove = (e) => {
      const tmpOnHover = e.currentTarget;
      const x = e.pageX - tmpOnHover.offsetLeft;
      const y = e.pageY - tmpOnHover.offsetTop;
      tmpOnHover.style.setProperty("--x", x + "px");
      tmpOnHover.style.setProperty("--y", y + "px");
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", handleCardMouseMove);
    });
    return () => {
      // Cleanup card hover effects
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleCardMouseMove);
      });
    };
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        document.querySelector(".header--sticky")?.classList.add("sticky");
      } else {
        document.querySelector(".header--sticky")?.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this runs once on mount
  useEffect(() => {
    const animates = document.querySelectorAll(".tmp-scroll-trigger");
    if (animates.length > 0) {
      animates.forEach((animate) => {
        animate.addEventListener("animationend", (e) => {
          setTimeout(() => {
            e.target.setAttribute("animation-end", "");
          }, 1000);
        });
      });
    }
  }, [pathname]); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const animatedTextElements = document.querySelectorAll(
      ".inv-title-animation-wrap"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;

            // Reset if needed
            if (element.animation) {
              element.animation.progress(1).kill();
              element.split.revert();
            }

            element.split = new SplitText(element, {
              type: "lines,words,chars",
              linesClass: "split-line",
            });

            gsap.set(element, { perspective: 400 });

            gsap.set(element.split.chars, {
              opacity: 0,
              x: "-10",
              rotateX: "0",
            });

            element.animation = gsap.to(element.split.chars, {
              x: "0",
              y: "0",
              rotateX: "0",
              opacity: 1,
              duration: 1,
              ease: Back.easeOut,
              stagger: 0.02,
            });

            observer.unobserve(element); // Unobserve to avoid repeat
          }
        });
      },
      { threshold: 0.1 }
    ); // Adjust threshold if needed

    animatedTextElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);
  useEffect(() => {
    const animatedTextElements = document.querySelectorAll(".tmp-title-split");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;

            // Reset if needed
            if (element.animation) {
              element.animation.progress(1).kill();
              element.split.revert();
            }

            element.split = new SplitText(element, {
              type: "chars",
            });

            gsap.set(element, { perspective: 400 });

            gsap.set(element.split.chars, {
              opacity: 0,
              x: "-10",
              rotateX: "0",
            });

            element.animation = gsap.to(element.split.chars, {
              x: "0",
              y: "0",
              rotateX: "0",
              opacity: 1,
              duration: 1,
              ease: Back.easeOut,
              stagger: 0.02,
            });

            observer.unobserve(element); // Unobserve to avoid repeat
          }
        });
      },
      { threshold: 0.1 }
    ); // Adjust threshold if needed

    animatedTextElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);
  useEffect(() => {
    const WOW = require("@/utlis/wow");
    const wow = new WOW.default({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [pathname]);

  return <>{children}</>;
}
