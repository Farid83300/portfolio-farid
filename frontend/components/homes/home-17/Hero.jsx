import React from "react";
import Image from "next/image";
import TyperComponent from "@/components/common/TyperComponent";

export default function Hero() {
  return (
    <div className="banner-right-thumbnail-area tmp-section-gap" id="home">
      <div className="container">
        <div className="row align-items-center pt--50">
          <div className="col-lg-7">
            <div className="banner-right-thumb-left-content">
              <span className="pre-title">Welcome to my world</span>
              <h1 className="title">
                I’m Jane Cooper <br />A{" "}
                <span className="header-caption">
                  <span className="cd-headline clip is-full-width">
                    <TyperComponent
                      strings={[
                        "Teacher",
                        "Instructor",
                        "Content Writer",
                        "Influencer",
                      ]}
                    />
                  </span>
                </span>
              </h1>
              <p className="disc">
                A personal portfolio is a collection of your work, achievements,
                and skills that highlights your abilities and professional
                growth. It serves as
              </p>
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
          <div className="col-lg-5">
            <div className="">
              <div className="thumbnail-right-inner-main-image tmponhover">
                <Image
                  alt=""
                  src="/assets/images/banner/instructor.png"
                  width={700}
                  height={933}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
