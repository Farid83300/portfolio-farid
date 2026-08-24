"use client";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems11 } from "@/data/portfolio";
import { useEffect, useState } from "react";

export default function Portfolio({ isLight = false }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filtered, setFiltered] = useState(portfolioItems11);
  const categories = [
    "All",
    "Branding",
    "Design",
    "Content writing",
    "Marketing",
  ];
  useEffect(() => {
    if (activeCategory == "All") {
      setFiltered(portfolioItems11);
    } else {
      setFiltered(
        portfolioItems11.filter((elm) =>
          elm.categories.includes(activeCategory)
        )
      );
    }
  }, [activeCategory]);

  return (
    <section className="tmp-portfolio-area tmp-section-gapTop" id="portfolio">
      <div className="container">
        <div className="section-head mb--60">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Latest Portfolio</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Transforming Ideas into Exceptional
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            Business consulting consultants provide expert advice and guida
            businesses to help them improve their performance, efficiency, and
            organizational
          </p>
        </div>
        <div className="latest-portfolio-tabs-area">
          <nav>
            <ul className="nav nav-tabs tmp-scroll-trigger tmp-fade-in animation-order-4">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className={`nav-link ${
                      activeCategory === category ? "active" : ""
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="tab-content bg-blur-style-three">
            <div className="tab-pane fade show active">
              <div className="row">
                {filtered.map((item) => (
                  <div
                    key={item.id} // Use the unique ID as the key
                    className="col-lg-4 col-md-6 col-sm-12"
                  >
                    {/* Use item.id for the animation order if needed sequentially */}
                    <div
                      className={`tmp-portfolio tmp-scroll-trigger tmp-fade-in animation-order-${item.id}`}
                    >
                      <Image
                        alt={item.title} // Use title for descriptive alt text
                        src={item.imageSrc} // Dynamic image source
                        width={item.width} // Dynamic width from data (or hardcode if always same)
                        height={item.height} // Dynamic height from data (or hardcode if always same)
                      />
                      <div className="portfolio-card-content-wrap">
                        <div className="content-left">
                          <p className="portfoli-card-para">
                            {item.description}
                          </p>{" "}
                          {/* Dynamic description */}
                          <h3 className="portfolio-card-title animated fadeIn">
                            {/* Link href is static, title is dynamic */}
                            <Link
                              href={`/project-details${
                                isLight ? "-white" : ""
                              }/${item.slug}`}
                            >
                              {item.title}
                            </Link>
                          </h3>
                        </div>
                        <div className="portfolio-btn">
                          {/* Button Link is static */}
                          <Link
                            href={`/project-details${isLight ? "-white" : ""}/${
                              item.slug
                            }`}
                            className="tmp-arrow-icon-btn"
                          >
                            <div className="btn-inner">
                              <i className="tmp-icon fa-solid fa-arrow-up-right" />
                              <i className="tmp-icon-bottom fa-solid fa-arrow-up-right" />
                            </div>
                          </Link>
                        </div>
                      </div>
                      {/* Overlay Link is static */}
                      <Link
                        href={`/project-details${isLight ? "-white" : ""}/${
                          item.slug
                        }`}
                        className="over_link"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
