import React from "react";
import Image from "next/image";
import Appointment from "./Appointment";
export default function ProjectDetails({ portfolioItem }) {
  return (
    <div className="project-details-area-wrapper tmp-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="project-details-thumnail-wrap">
              <Image
                alt="thumbnail"
                src={portfolioItem.imageSrc}
                width={1290}
                height={560}
              />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="project-details-content-wrap">
              <h2 className="title">{portfolioItem.title}</h2>
              <p className="docs">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a
                galltype and scrambled it to make a type specimen book. It has
                survived not only five centuries tinto electronic typesetting
                remaining essentially unchanged
              </p>
              <p className="docs">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown print
              </p>
              <div className="check-box-wrap">
                <ul>
                  <li>
                    <h4 className="check-box-item">
                      <span>
                        <i className="fa-solid fa-circle-check" />
                      </span>
                      Ui/visual Design
                    </h4>
                  </li>
                  <li>
                    <h4 className="check-box-item">
                      <span>
                        <i className="fa-solid fa-circle-check" />
                      </span>
                      App Development
                    </h4>
                  </li>
                  <li>
                    <h4 className="check-box-item">
                      <span>
                        <i className="fa-solid fa-circle-check" />
                      </span>
                      Software Developer
                    </h4>
                  </li>
                </ul>
              </div>
              <h2 className="mini-title">
                Elevate Your Business with IT Solutions
              </h2>
              <p className="docs">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a
                galltype and scrambled it to make a type specimen book. It has
                survived not only five centuries tinto electronic typesetting
                remaining essentially unchanged
              </p>
              <div className="project-details-swiper-wrapper">
                <div className="swiper project-details-swiper">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="project-details-img">
                        <Image
                          alt="swiper-img"
                          src="/assets/images/projects-details/project-detials-swiper-img-1.jpg"
                          width={410}
                          height={295}
                        />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="project-details-img">
                        <Image
                          alt="swiper-img"
                          src="/assets/images/projects-details/project-detials-swiper-img-2.png"
                          width={410}
                          height={295}
                        />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="project-details-img">
                        <Image
                          alt="swiper-img"
                          src="/assets/images/projects-details/project-detials-swiper-img-1.jpg"
                          width={410}
                          height={295}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-details-swiper-btn">
                  <div className="project-swiper-button-prev">
                    <span>
                      <i className="fa-solid fa-arrow-left" />
                    </span>
                    Previous
                  </div>
                  <div className="project-swiper-button-next">
                    Next{" "}
                    <span>
                      <i className="fa-solid fa-arrow-right" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Tpm Get In touch start */}
            <Appointment />
            {/* Tpm Get In touch End */}
          </div>
          <div className="col-lg-4">
            <div className="signle-side-bar project-details-area tmponhover">
              <div className="header">
                <h3 className="title">Project Details</h3>
              </div>
              <div className="body">
                <div className="project-details-info">
                  Name: <span>Hosting vps</span>
                </div>
                <div className="project-details-info">
                  Author: <span>Nadimul Islam</span>
                </div>
                <div className="project-details-info">
                  Date: <span>23 January,2024</span>
                </div>
                <div className="project-details-info">
                  Tags: <span>Host Web Design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
