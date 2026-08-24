import React from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems3 } from "@/data/portfolio";

export default function Portfolio3({ isLight = false }) {
  return (
    <div className="tmp-portfolio-area" id="portfolio">
      <div className="inner">
        <div className="section-head text-align-left mb--50">
          <h2 className="custom-title mb--20 tmp-scroll-trigger tmp-fade-in animation-order-1">
            My Completed Work
            <span>
              <Image
                alt="custom-line"
                src="/assets/images/custom-line/custom-line.png"
                width={81}
                height={6}
              />
            </span>
          </h2>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Elevate your brand with a the
          </h2>
          <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
            ished fact that a reader will be distrol acted bioiiy desig ished
            fact that a reader <br />
            will acted ished fact that a reader will be distrol acted
          </p>
        </div>
        <div className="row">
          {portfolioItems3.map((item) => (
            <div className="col-lg-6 col-md-6 col-sm-12" key={item.id}>
              <div className="tmp-portfolio tmp-scroll-trigger tmp-fade-in animation-order-1">
                <Image
                  alt="tab-image"
                  src={item.imageSrc}
                  width={410}
                  height={457}
                />
                <div className="portfolio-card-content-wrap">
                  <div className="content-left">
                    <p className="portfoli-card-para">{item.description}</p>
                    <h3 className="portfolio-card-title animated fadeIn">
                      <Link
                        href={`/project-details${isLight ? "-white" : ""}/${
                          item.slug
                        }`}
                      >
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                  <div className="portfolio-btn">
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
  );
}
