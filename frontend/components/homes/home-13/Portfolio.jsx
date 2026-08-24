import React from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems4 } from "@/data/portfolio";

export default function Portfolio({ isLight = false }) {
  return (
    <div className="tmp-portfolio-section-area banner-personal-portfolio signle-section tmp-section-gapBottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-header pb--20">
              <h4 className="subtitle wow move-right">
                <i className="fa-light fa-briefcase" /> PORTFOLIO
              </h4>
              <h2 className="title tmp-title-split">
                Featured <span>Projects</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row g-5 mt--10">
          {portfolioItems4.map((item) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-sal-delay={item.animationDelay || undefined}
              className="col-lg-6 col-xl-6 col-md-6 col-12"
            >
              <div
                className="tmp-portfolio-small bg-color-card tmponhover"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalCenter"
              >
                <div className="inner">
                  <div className="thumbnail">
                    <Link
                      href={`/project-details${isLight ? "-white" : ""}/${
                        item.slug
                      }`}
                    >
                      <Image
                        alt="Personal Portfolio Images"
                        src={item.imageSrc}
                        width={1010}
                        height={756}
                      />
                    </Link>
                  </div>
                  <div className="content">
                    <div className="category-info">
                      <div className="category-list">
                        <Link
                          href={`/project-details${isLight ? "-white" : ""}/${
                            item.slug
                          }`}
                        >
                          {item.category}
                        </Link>
                      </div>
                      <div className="meta">
                        <span>
                          <Link
                            href={`/project-details${isLight ? "-white" : ""}/${
                              item.slug
                            }`}
                          >
                            <i className="feather-heart" />
                          </Link>
                          {item.likes}
                        </span>
                      </div>
                    </div>
                    <h4 className="title">
                      <Link
                        href={`/project-details${isLight ? "-white" : ""}/${
                          item.slug
                        }`}
                      >
                        {item.title}
                        <i className="fa-solid fa-arrow-up-right" />
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
