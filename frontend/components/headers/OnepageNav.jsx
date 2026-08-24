import { useEffect, useState } from "react";

const navItems = [
  { id: 1, href: "#home", text: "Home" },
  { id: 2, href: "#about", text: "About" },
  { id: 3, href: "#service", text: "Services" },
  { id: 4, href: "#portfolio", text: "Portfolio" },
  { id: 5, href: "#resume", text: "Resume" },
  { id: 6, href: "#pricing", text: "Pricing" },
  { id: 7, href: "#blog", text: "Blog" },
  { id: 8, href: "#contacts", text: "Contact" },
];

export default function OnepageNav({
  sectionIds = navItems,
  activeClass = "current",
}) {
  const [activeSection, setActiveSection] = useState(
    sectionIds[0].href.replace("#", "")
  );

  useEffect(() => {
    // Create an IntersectionObserver to track visibility of sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Update active section when the section is visible in the viewport
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px", // Trigger when section is 50% visible
      }
    );

    // Observe each section
    setTimeout(() => {
      sectionIds.forEach((elm) => {
        const element = document.querySelector(elm.href);
        if (element) {
          observer.observe(element);
        }
      });
    });
    return () => {
      // Cleanup the observer when the component unmounts
      observer.disconnect();
    };
  }, [sectionIds]);

  const handleClick = (e, id) => {
    e.preventDefault();
    document
      .querySelector(id)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {navItems.map((item) => (
        <li
          key={item.id}
          className={
            activeSection == item.href.replace("#", "")
              ? activeClass
              : "nav-item"
          }
        >
          <a
            className="smoth-animation"
            onClick={(e) => handleClick(e, item.href)}
            href={item.href}
          >
            {item.text}
          </a>
        </li>
      ))}
    </>
  );
}
