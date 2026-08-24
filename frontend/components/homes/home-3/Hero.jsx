import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="rpp-banner-three-area">
      <div className="container">
        <div className="banner-three-main-wrapper">
          <div className="row">
            <div className="col-lg-4">
              <div className="inner">
                <span className="sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                  Hello i’m
                </span>
                <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-2">
                  Brooklyn Simmons
                </h1>
                <div className="button-area-banner-three tmp-scroll-trigger tmp-fade-in animation-order-3">
                  <Link
                    className="tmp-btn hover-icon-reverse radius-round"
                    href={`/portfolio-details`}
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
            <div className="col-lg-3">
              <div className="banner-right-content">
                <div className="about-me tmp-scroll-trigger tmp-fade-in animation-order-1">
                  <h3 className="title">About Me</h3>
                  <p className="para tmp-title-split">
                    A personal <span>portfolio</span> is a collection of to your
                    work, that is achievements, and a skills that{" "}
                    <span>web design</span> highlights in your{" "}
                  </p>
                </div>
                <div className="find-me-on mt--40 tmp-scroll-trigger tmp-fade-in animation-order-2">
                  <h2 className="find-me-on-title">Find me on</h2>
                  <div className="social-link banner">
                    <a href="#">
                      <i className="fa-brands fa-instagram" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-linkedin-in" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-facebook-f" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-benner-img-three">
            <Image
              className="tmp-scroll-trigger tmp-zoom-in animation-order-2"
              alt="banner-img-3"
              width={689}
              height={871}
              src="/assets/images/banner/banner-user-image-three.png"
            />
          </div>
          <h2 className="texts-one up-down-2">WEB DESIGN</h2>
          <h2 className="texts-two up-down">WEB DESIGN</h2>
        </div>
      </div>
    </div>
  );
}
