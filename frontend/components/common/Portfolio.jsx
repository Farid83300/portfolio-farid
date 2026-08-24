"use client";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems } from "@/data/portfolio";
import { useEffect, useState } from "react";

export default function Portofolio({ isLight = false }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filtered, setFiltered] = useState(portfolioItems);
  const categories = [
    "All",
    "Branding",
    "Design",
    "Content writing",
    "Marketing",
  ];
  useEffect(() => {
    if (activeCategory == "All") {
      setFiltered(portfolioItems);
    } else {
      setFiltered(
        portfolioItems.filter((elm) => elm.categories.includes(activeCategory))
      );
    }
  }, [activeCategory]);

  return (
    <section
      className="latest-portfolio-area custom-column-grid tmp-section-gap"
      id="portfolio"
    >
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
            <ul className="nav nav-tabs">
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
          <div className="tab-content bg-blur-style-one">
            <div className="tab-pane fade show active">
              <div className="row">
                {filtered.map((item) => (
                  <div className="col-lg-6" key={item.id}>
                    <div
                      className={`latest-portfolio-card-style-two image-box-hover tmp-scroll-trigger tmp-fade-in animation-order-${item.animationOrder}`}
                    >
                      <div className="portfoli-card-img">
                        <div className="img-box v2">
                          <Link
                            className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                            href={`/project-details${isLight ? "-white" : ""}/${
                              item.slug
                            }`}
                          >
                            <Image
                              className="w-100"
                              alt="Thumbnail"
                              src={item.imageSrc}
                              width={item.width}
                              height={item.height}
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="portfolio-card-content-wrap">
                        <div className="content-left">
                          <h3 className="portfolio-card-title">
                            <Link
                              href={`/project-details${
                                isLight ? "-white" : ""
                              }/${item.slug}`}
                            >
                              {item.title}
                            </Link>
                          </h3>
                          <div className="tag-items">
                            <ul>
                              {item.tags.map((tag, index) => (
                                <li key={index}>
                                  <a href="#" className="tag-item">
                                    {tag}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <Link
                          className="tmp-btn hover-icon-reverse radius-round btn-border btn-md"
                          href={`/project-details${isLight ? "-white" : ""}/${
                            item.slug
                          }`}
                        >
                          <span className="icon-reverse-wrapper">
                            <span className="btn-text">View design</span>
                            <span className="btn-icon">
                              <i className="fa-sharp fa-regular fa-arrow-right" />
                            </span>
                            <span className="btn-icon">
                              <i className="fa-sharp fa-regular fa-arrow-right" />
                            </span>
                          </span>
                        </Link>
                      </div>
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
