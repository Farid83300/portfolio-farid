import React from "react";

import { services3 } from "@/data/services";

import Link from "next/link";

export default function Services({ isLight = false }) {
  return (
    <div className="tmp-service-area tmp-section-gapBottom banner-personal-portfolio signle-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-header pb--20">
              <h4 className="subtitle wow move-right">
                <i className="fa-solid fa-layer-group" /> My Service
              </h4>
              <h2 className="title tmp-title-split">
                My <span>Specializations</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row g-5 service-wrapper mt--10">
          {services3.map((service) => (
            <div
              className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12"
              key={service.id}
            >
              <div className="service service__style--1 bg-color-card service-narrow radius text-center tmp-border-none tmponhover">
                <div className="icon">
                  <i className={service.icon} />
                </div>
                <div className="content">
                  <h4 className="title w-600">
                    <Link
                      href={`/service-details${isLight ? "-white" : ""}/${
                        service.slug
                      }`}
                    >
                      {service.title}
                    </Link>
                  </h4>
                  <p className="description mb--0">{service.description}</p>
                  <div className="discover-btn mt--20">
                    <Link
                      className="tmp-btn round btn-small btn-border hover-icon-reverse"
                      href={`/service-details${isLight ? "-white" : ""}/${
                        service.slug
                      }`}
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">services</span>
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
          ))}
        </div>
      </div>
    </div>
  );
}
