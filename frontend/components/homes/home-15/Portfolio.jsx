import React from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems5 } from "@/data/portfolio";

export default function Portfolio({ isLight = false }) {
  return (
    <section className="tmp-latest-portfolio tmp-section-gapTop" id="portfolio">
      <div className="container">
        <div className="header-top-inner">
          <div className="section-head text-align-left">
            <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
              <span className="subtitle">Recent Portfolio</span>
            </div>
            <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
              Transforming Ideas <br />
              into Exceptional
            </h2>
          </div>
          <div className="discription-area tmp-scroll-trigger tmp-fade-in animation-order-3">
            <p className="description">
              Business consulting consultants provide expert advice and guida
              <span>businesses</span> to help them improve their performance,
              efficiency, and organizational
            </p>
          </div>
        </div>
        <div className="row g-5">
          {portfolioItems5.map((item) => (
            <div className="col-lg-6 col-md-6 col-12" key={item.id}>
              <div
                className={`latest-portfolio-card-style-two tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${item.animationOrder}`}
              >
                <div className="portfoli-card-img">
                  <div className="img-box v2">
                    <Link
                      href={`/project-details${isLight ? "-white" : ""}/${
                        item.slug
                      }`}
                    >
                      <Image
                        className="img-primary hidden-on-mobile"
                        alt="Blog Thumbnail"
                        src={item.imageSrc}
                        width={825}
                        height={594}
                      />
                      <Image
                        className="img-secondary"
                        alt="Blog Thumbnail"
                        src={item.imageSrc}
                        width={825}
                        height={594}
                      />
                    </Link>
                  </div>
                </div>
                <div className="portfolio-card-content-wrap">
                  <div className="content-left">
                    <h3 className="portfolio-card-title">
                      <Link
                        href={`/project-details${isLight ? "-white" : ""}/${
                          item.slug
                        }`}
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
                  <div className="tmp-button-here">
                    <Link
                      className="tmp-btn hover-icon-reverse radius-round btn-border btn-md"
                      href={`/project-details${isLight ? "-white" : ""}/${
                        item.slug
                      }`}
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">{item.buttonText}</span>
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
            </div>
          ))}
        </div>
        <div className="see-all-btn-wrap text-center mt--60">
          <a className="tmp-btn hover-icon-reverse radius-round" href="#">
            <span className="icon-reverse-wrapper">
              <span className="btn-text">View All Portfolio</span>
              <span className="btn-icon">
                <i className="fa-sharp fa-regular fa-arrow-right" />
              </span>
              <span className="btn-icon">
                <i className="fa-sharp fa-regular fa-arrow-right" />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
