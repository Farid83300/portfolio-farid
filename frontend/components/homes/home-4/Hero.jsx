import React from "react";
import Image from "next/image";
import Link from "next/link";
import OdometerComponent from "@/components/common/OdometerComponent";
export default function Hero() {
  return (
    <div className="rpp-banner-four-area">
      <div className="container">
        <div className="banner-four-main-wrapper">
          <div className="bg-benner-img-four">
            <Image
              className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
              alt="banner-img-3"
              src="/assets/images/banner/banner-user-image-four.png"
              width={959}
              height={778}
            />
          </div>
          <div className="banner-four-right-bg-img">
            <Image
              alt="banner-img-3"
              src="/assets/images/banner/banner-four-right-bg-img.png"
              width={630}
              height={830}
            />
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="inner">
                <span className="sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                  Web Developer
                </span>
                <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-2">
                  Jackson Clark
                </h1>
                <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
                  Outsourcing can provide corporate businesses with several
                  advantages, incl b usinesses Outsourcing can provide usinesses
                  Outsourcing can provide
                </p>
                <div className="button-area-banner-three tmp-scroll-trigger tmp-fade-in animation-order-4">
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
            <div className="col-lg-3 col-md-6">
              <div className="banner-right-content tmp-scroll-trigger tmp-fade-in animation-order-5">
                <div className="year-expariance-wrap">
                  {/* <h3 class="title "><span class="counter">25</span></h3> */}
                  <h3 className="counter title">
                    <OdometerComponent max={25} />
                  </h3>
                  <p className="para">
                    Years Of <br />
                    experience
                  </p>
                </div>
                <div className="find-me-on">
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
        </div>
      </div>
      <div className="banner-four-left-bg-img">
        <Image
          alt="banner-img-3"
          src="/assets/images/banner/banner-four-left-bg-img.png"
          width={865}
          height={900}
        />
      </div>
    </div>
  );
}
