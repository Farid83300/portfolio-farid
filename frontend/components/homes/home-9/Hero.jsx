import React from "react";
import Link from "next/link";
import TyperComponent from "@/components/common/TyperComponent";

export default function Hero() {
  return (
    <div className="tmp-banner-one-area style-2 bg_image bg_image--4" id="home">
      <div className="container">
        <div className="banner-one-main-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-1">
              <div className="inner">
                <span className="sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                  Hello
                </span>
                <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-2">
                  I’m Jane Cooper <br />A{" "}
                  <span className="header-caption">
                    <span className="cd-headline clip is-full-width">
                      <TyperComponent
                        strings={[
                          "Web Designer.",
                          "Web Developer.",
                          "UI/UX Designer.",
                          "Freelancer.",
                          "Content Writer.",
                        ]}
                      />
                    </span>
                  </span>
                </h1>
                <p className="disc tmp-scroll-trigger tmp-fade-in animation-order-3">
                  A personal portfolio is a collection of your work,
                  achievements, and skills that highlights your abilities and
                  professional growth. It serves as
                </p>
                <div className="button-area-banner-one tmp-scroll-trigger tmp-fade-in animation-order-4">
                  <Link
                    className="tmp-btn hover-icon-reverse radius-round"
                    href={`/project`}
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">View Portfolio</span>
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
        </div>
      </div>
    </div>
  );
}
