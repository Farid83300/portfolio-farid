import React from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems7 } from "@/data/portfolio";

export default function Portfolio({ isLight = false }) {
  return (
    <div className="tpm-custom-box-bg">
      {/* Tpm Latest Portfolio Area Start */}
      <div className="latest-portfolio-area custom-column-grid">
        <div className="container">
          <div className="section-head mb--60">
            <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
              <span className="subtitle">Latest Portfolio</span>
            </div>
            <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
              Transforming Ideas into Exceptional{" "}
            </h2>
            <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
              Business consulting consultants provide expert advice and guida
              businesses to help them improve their performance, efficiency, and
              organizational
            </p>
          </div>
          <div className="row">
            {portfolioItems7.map((item) => (
              <div className="col-lg-6 col-md-6" key={item.id}>
                <div
                  className={`latest-portfolio-card tmp-hover-link tmp-scroll-trigger tmp-fade-in animation-order-1 ${item.marginClass}`}
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
                          width={item.width}
                          height={item.height}
                          src={item.imageSrc}
                        />
                        <Image
                          className="img-secondary"
                          alt="Blog Thumbnail"
                          width={item.width}
                          height={item.height}
                          src={item.imageSrc}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="portfolio-card-content-wrap">
                    <div className="content-left">
                      <h3 className="portfolio-card-title">
                        <Link
                          className="link"
                          href={`/project-details${isLight ? "-white" : ""}/${
                            item.slug
                          }`}
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <p className="portfoli-card-para">{item.description}</p>
                    </div>
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
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Tpm Latest Portfolio Area End */}
      {/* Tpm My Skill Area Start */}
      <section className="my-skill tmp-section-gapTop">
        <div className="container">
          <div className="section-head text-align-left mb--60">
            <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
              <span className="subtitle">My Skill</span>
            </div>
            <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
              Elevated Designs Personalized <br /> the best Experiences
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
                  Read More{" "}
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
                  Read More{" "}
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
                  Read More{" "}
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
