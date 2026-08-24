import React from "react";
import Link from "next/link";
const pricingOptions = [
  {
    type: "basic",
    note: (
      <>
        Have design ready to build?
        <br />
        or small budget
      </>
    ),
    price: "$59",
    features: [
      "Need your wireframe",
      "Design with Figma, Framer",
      "Implement with Webflow, React, WordPress, Laravel/PHP",
      "Remote/Online",
      "Work in business days, no weekend.",
      "Support 6 months",
    ],
  },
  {
    type: "premium",
    note: (
      <>
        Not have any design?
        <br />
        Leave its for me
      </>
    ),
    price: "$129",
    features: [
      "Don't need wireframe or anything",
      "Design with Figma, Framer from scratch",
      "Implement with Webflow, React, WordPress, Laravel/PHP",
      "Remote/Online",
      "Work with both weekend",
      "Support 12 months",
      "Your project alway be priority",
      "Customer care gifts",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="tmp-service-area tmp-section-gapBottom banner-personal-portfolio signle-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-header pb--20">
              <h4 className="subtitle wow move-right">
                <i className="fa-sharp fa-solid fa-circle-dollar" />
                Pricing
              </h4>
              <h2 className="title tmp-title-split">
                My <span>Pricing</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="pricing-table-items">
          <div className="row g-5">
            {pricingOptions.map((option, index) => (
              <div className="col-md-6" key={index}>
                <div className="pricing-table-col-2 tmponhover">
                  <div className="pricing-table-header">
                    <div className="top d-flex justify-content-between align-items-start">
                      <h4>{option.type}</h4>
                      <p className="text-right">{option.note}</p>
                    </div>
                    <h3>
                      {option.price} <span>/ hour</span>
                    </h3>
                  </div>
                  <ul className="feature-lists">
                    {option.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className="tmp-btn btn-primary w-100">
                    pick this package
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p
            className="info scroll-animation"
            data-animation="fade_from_bottom"
          >
            Don't find any package that matches your plan! <br />
            Want to set up a new tailor-made package for only you?.{" "}
            <Link href={`/contact`}>Contact Me</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
