import React from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems10 } from "@/data/portfolio";

export default function Portfolio({ isLight = false }) {
  return (
    <div className="tpm-custom-box-bg">
      <section className="latest-portfolio-area custom-column-grid">
        <h2 className="latest-portfolio-custom-title end">latest-portfolio</h2>
        <div className="container">
          <div className="row">
            {portfolioItems10.map((item) => (
              <div
                key={item.id} // Use a unique key from your data
                className="col-lg-6 col-md-6 col-12"
              >
                <div
                  className={`latest-portfolio-card-style-two tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${item.animationOrder}`}
                >
                  <div className="portfoli-card-img">
                    <div className="img-box v2">
                      {/* Link is static as per examples */}
                      <Link
                        href={`/project-details${isLight ? "-white" : ""}/${
                          item.slug
                        }`}
                      >
                        <Image
                          className="img-primary hidden-on-mobile"
                          alt={item.imageAlt} // Dynamic alt text
                          src={item.imageSrc} // Dynamic image source
                          width={550} // Static width as per examples
                          height={396} // Static height as per examples
                        />
                        {/* Second image uses the same source and dimensions */}
                        <Image
                          className="img-secondary"
                          alt={item.imageAlt} // Dynamic alt text
                          src={item.imageSrc} // Dynamic image source
                          width={550} // Static width
                          height={396} // Static height
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="portfolio-card-content-wrap">
                    <div className="content-left">
                      <h3 className="portfolio-card-title">
                        {/* Link is static, title is dynamic */}
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
                          {/* Map over the tags array */}
                          {item.tags.map((tag, index) => (
                            <li key={index}>
                              {" "}
                              {/* Use index as key for tag items */}
                              {/* Tag link is static as per examples */}
                              <a href="#" className="tag-item">
                                {tag} {/* Dynamic tag text */}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="tmp-button-here">
                      {/* Button link and text are static as per examples */}
                      <Link
                        className="tmp-btn hover-icon-reverse radius-round btn-border btn-md"
                        href={`/project-details${isLight ? "-white" : ""}${
                          isLight ? "-white" : ""
                        }/${item.slug}`}
                      >
                        <span className="icon-reverse-wrapper">
                          <span className="btn-text">View Design</span>{" "}
                          {/* Static text */}
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
        </div>
      </section>
      {/* Tpm Our Latest Portfolio  Area End */}
      {/* Tpm My Skill Area Start */}
      <section className="my-skill tmp-section-gapTop">
        <div className="container">
          <div className="section-head text-align-left mb--60">
            <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
              <span className="subtitle">My Skill</span>
            </div>
            <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
              Elevated Designs Personalized <br />
              the best Experiences
            </h2>
          </div>
          <div className="services-widget v1">
            <div className="service-item current tmp-scroll-trigger tmp-fade-in animation-order-1">
              <div className="my-skill-card">
                <div className="card-icon">
                  <i className="fa-light fa-building-columns" />
                </div>
                <div className="card-title">
                  <h3 className="main-title">Ui/visual Design</h3>
                  <p className="sub-title">21 Done</p>
                </div>
                <p className="card-para">
                  My work is driven by the belief that thoughtful design and
                  strategic planning can empower brands strategic planning can
                  empower brands
                </p>
                <a href="#" className="read-more-btn">
                  Read More
                  <span className="read-more-icon">
                    <i className="fa-solid fa-angle-right" />
                  </span>
                </a>
              </div>
              <button className="service-link modal-popup" />
            </div>
            <div className="service-item tmp-scroll-trigger tmp-fade-in animation-order-2">
              <div className="my-skill-card">
                <div className="card-icon">
                  <i className="fa-light fa-calendar" />
                </div>
                <div className="card-title">
                  <h3 className="main-title">Ui/visual Design</h3>
                  <p className="sub-title">21 Done</p>
                </div>
                <p className="card-para">
                  In this portfolio, you’ll find a curated selection of projects
                  that highlight my skills in [Main Areas, e.g., responsive web
                  design
                </p>
                <a href="#" className="read-more-btn">
                  Read More
                  <span className="read-more-icon">
                    <i className="fa-solid fa-angle-right" />
                  </span>
                </a>
              </div>
              <button className="service-link modal-popup" />
            </div>
            <div className="service-item tmp-scroll-trigger tmp-fade-in animation-order-3">
              <div className="my-skill-card">
                <div className="card-icon">
                  <i className="fa-light fa-pen-nib" />
                </div>
                <div className="card-title">
                  <h3 className="main-title">Motion Design</h3>
                  <p className="sub-title">20 Done</p>
                </div>
                <p className="card-para">
                  Each project here showcases my commitment to excellence and
                  adaptability, tailored to meet each client’s unique needs
                </p>
                <a href="#" className="read-more-btn">
                  Read More
                  <span className="read-more-icon">
                    <i className="fa-solid fa-angle-right" />
                  </span>
                </a>
              </div>
              <button className="service-link modal-popup" />
            </div>
            <div className="active-bg wow fadeInUp mleave" />
          </div>
        </div>
      </section>
      {/* Tpm My Skill Area End */}
    </div>
  );
}
