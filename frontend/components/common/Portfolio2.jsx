import React from "react";
import Image from "next/image";

import { portfolioItems2 } from "@/data/portfolio";

import Link from "next/link";
export default function Portfolio({ isLight = false }) {
  return (
    <div
      className="latest-portfolio-area custom-column-grid tmp-section-gapTop"
      id="portfolio"
    >
      <div className="container">
        <div className="section-head mb--60">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Latest Portfolio</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Transforming Ideas into <br />
            Exceptional
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            Business consulting consultants provide expert advice and guida
            businesses to help them improve their performance, efficiency, and
            organizational
          </p>
        </div>
        <div className="row">
          {portfolioItems2.map((item) => (
            <div className="col-lg-6 col-sm-6" key={item.id}>
              <div
                className={`latest-portfolio-card tmp-hover-link tmp-scroll-trigger tmp-fade-in animation-order-${item.animationOrder}`}
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
  );
}
