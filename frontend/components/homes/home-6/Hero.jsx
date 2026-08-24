import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <div className="rpp-banner-six-area">
      <div className="container">
        <div className="banner-six-main-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-7 order-lg-2">
              <div className="banner-right-content">
                <div className="bg-benner-img-six">
                  <Image
                    className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                    alt="banner-img-3"
                    src="/assets/images/banner/banner-user-image-six.png"
                    width={531}
                    height={531}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-5 order-lg-1">
              <div className="inner">
                <span className="sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                  Web Developer
                </span>
                <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-2">
                  Jackson Clark
                </h1>
                <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
                  Outsourcing can provide corporate businesses with several
                  advantages, incl b usinesses Outsourcing can provide
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
          </div>
        </div>
      </div>
      <div className="bg-left-shape">
        <Image
          alt=""
          src="/assets/images/banner/bg-six-shape-left-side.png"
          width={865}
          height={900}
        />
      </div>
    </div>
  );
}
