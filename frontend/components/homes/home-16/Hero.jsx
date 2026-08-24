import React from "react";

export default function Hero() {
  return (
    <div
      className="tmp-banner-one-area model-style-banner with-instructor style-2"
      id="home"
      data-black-overlay={5}
    >
      <div className="container">
        <div className="banner-one-main-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="inner banner-model-15">
                <h1 className="title tmp-fade-in">Julian Tobias</h1>
                <p className="disc tmp-fade-in">
                  German Gym Instructor, Entrepreneur &amp; Youtuber
                </p>
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
      <div className="hero-bg-video">
        <video autoPlay muted loop id="myVideo">
          <source src="/assets/images/video/fitness.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
