import React from "react";
import Link from "next/link";
export default function Hero() {
  return (
    <div
      className="tmp-banner-area-full-width-modern bg_modern-banner-bg bg_image"
      id="home"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="banner-inner-modern-content">
              <h1 className="title tmp-title-split">
                INNOVATE <br />
                <span>FOR DESIGN</span>
                <br />
                DELIVER
              </h1>
              <div className="right-content">
                <p className="disc">
                  A personal portfolio is a collection of your work, that is aa
                  go achievements, and skills that highlights web design in your
                  is abilities and professional growth. It serves as A personal
                  to a portfolio in since 2009 a collection of your work
                </p>
                <Link
                  className="tmp-btn hover-icon-reverse radius-round"
                  href={`/about`}
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">LETS CONTACT</span>
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
      <div className="social-area-wrapper-varticle">
        <ul>
          <li>
            <a href="#">
              <i className="fa-brands fa-facebook-f" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-youtube" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-instagram" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-tiktok" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-twitter" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
