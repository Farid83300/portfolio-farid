import React from "react";
import Image from "next/image";
import TyperComponent from "@/components/common/TyperComponent";

export default function Hero() {
  return (
    <div className="rpp-banner-two-area">
      <div className="container">
        <div className="banner-two-main-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="banner-right-content">
                <div className="main-img">
                  <Image
                    className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                    alt="banner-img"
                    src="/assets/images/banner/banner-user-image-two.png"
                    width={444}
                    height={711}
                  />
                  <h2 className="banner-big-text-1 up-down-2">Ux Designer</h2>
                  <h2 className="banner-big-text-2 up-down">Ux Designer</h2>
                  <div className="benner-two-bg-red-img">
                    <Image
                      alt="red-img"
                      src="/assets/images/banner/banner-user-image-two-red-bg.png"
                      width={630}
                      height={285}
                    />
                  </div>
                  <div className="logo-under-img-wrap">
                    <div className="logo-under-img">
                      <Image
                        alt="logo-under-image"
                        src="/assets/images/banner/logo-under-image.png"
                        width={198}
                        height={198}
                      />
                    </div>
                    <div className="logo-under-img-2">
                      <Image
                        alt="logo-under-image"
                        src="/assets/images/banner/logo-under-image-2.png"
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-lg-1 mt--100">
              <div className="inner">
                <span className="sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                  I am
                </span>
                <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-2">
                  Ralph Edwards, a Full Stuck <br />
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
                <p className="disc tmp-scroll-trigger tmp-title-split tmp-fade-in animation-order-3">
                  A personal <span>portfolio</span> is a collection of your
                  work, that is achievements, and skills that highlights in your
                  abilities and professional <span>web design</span> growth. It
                  serves as
                </p>
                <div className="button-area-banner-two tmp-scroll-trigger tmp-fade-in animation-order-4">
                  <a
                    className="tmp-btn hover-icon-reverse radius-round"
                    href="#"
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">More About Us</span>
                      <span className="btn-icon">
                        <i className="fa-sharp fa-regular fa-arrow-right" />
                      </span>
                      <span className="btn-icon">
                        <i className="fa-sharp fa-regular fa-arrow-right" />
                      </span>
                    </span>
                  </a>
                </div>
                <div className="find-me-on tmp-scroll-trigger tmp-fade-in animation-order-5">
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
      <div className="banner-shape-two">
        <Image
          alt=""
          src="/assets/images/banner/banner-shape-two.png"
          width={778}
          height={900}
        />
      </div>
    </div>
  );
}
