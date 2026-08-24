import { serviceCards3 } from "@/data/services";
import React from "react";

export default function Services5({
  parentClass = "tmp-service-area tmp-section-gapBottom",
}) {
  return (
    <div className={parentClass} id="service">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-head mb--50">
              <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                <span className="subtitle">What I Do</span>
              </div>
              <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                What I Provide For You
              </h2>
            </div>
          </div>
        </div>
        <div className="about-us-section-card row g-5">
          {serviceCards3.map((card, index) => (
            <div className="col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
              <div
                className={`about-us-card tmp-scroll-trigger tmponhover tmp-fade-in animation-order-${card.animationOrder}`}
              >
                <div className="card-head">
                  <div className="logo-img">
                    <i className={card.iconClass}></i>
                  </div>
                  <h3 className="card-title">{card.title}</h3>
                </div>
                <p className="card-para">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
