import React from "react";
import Image from "next/image";
import { pricingPlans2 } from "@/data/pricing";

export default function Pricing() {
  return (
    <section className="our-price-plan-area tmp-section-gapTop">
      <div className="container">
        <div className="section-head mb--60">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">My Price plan</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Enhancing Collaboration <br />
            between Remote
          </h2>
        </div>
        <div className="row align-items-center">
          {pricingPlans2.map((plan, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div
                className={`price-plan-card v2 tmponhover blur-style-three tmp-scroll-trigger tmp-fade-in animation-order-${
                  index + 1
                } ${plan.active ? "active" : ""}`}
              >
                <div className="price-plan-card-icon">
                  <Image
                    alt="pricing-logo"
                    src={plan.icon}
                    width={65}
                    height={65}
                  />
                </div>
                <span className="price-sub-title">{plan.title}</span>
                <div className="check-box">
                  <ul>
                    {plan.features.map((feature, i) => (
                      <li key={i}>
                        <div className="check-box-item">
                          <div className="box-icon">
                            <i className="fa-solid fa-circle-check" />
                          </div>
                          <p className="box-para">{feature}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <h3 className="main-price">{plan.price}</h3>
                <p className="per-month">Per Month</p>
                <div className="tmp-button-here">
                  <a
                    href="#"
                    className={`tmp-btn hover-icon-reverse btn-md radius-round ${
                      plan.borderedButton ? "btn-border" : ""
                    }`}
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Get Started</span>
                      <span className="btn-icon">
                        <i className="fa-sharp fa-regular fa-arrow-right" />
                      </span>
                      <span className="btn-icon">
                        <i className="fa-sharp fa-regular fa-arrow-right" />
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
