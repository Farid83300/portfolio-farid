import React from "react";

import { services2 } from "@/data/services";

import Link from "next/link";

export default function Services({
  parentClass = "latest-service-area tmp-section-gapTop",
  isLight = false,
}) {
  return (
    <section className={parentClass} id="features">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-sm-6">
            {services2
              .filter((service) => service.column === 1)
              .map((service) =>
                service.isLink ? (
                  <Link
                    href={`/service-details${isLight ? "-white" : ""}/${
                      service.slug
                    }`}
                    className={`service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${service.animationOrder}`}
                    key={service.id}
                  >
                    <h2 className="service-card-num">
                      <span>{service.num}</span>
                      {service.title}
                    </h2>
                    <p className="service-para">{service.description}</p>
                  </Link>
                ) : (
                  <div
                    className={`service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${service.animationOrder}`}
                    key={service.id}
                  >
                    <h2 className="service-card-num">
                      <span>{service.num}</span>
                      {service.title}
                    </h2>
                    <p className="service-para">{service.description}</p>
                  </div>
                )
              )}
          </div>

          {/* Second column */}
          <div className="col-lg-6 col-sm-6">
            {services2
              .filter((service) => service.column === 2)
              .map((service) =>
                service.isLink ? (
                  <Link
                    href={`/service-details${isLight ? "-white" : ""}/${
                      service.slug
                    }`}
                    className={`service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${service.animationOrder}`}
                    key={service.id}
                  >
                    <h2 className="service-card-num">
                      <span>{service.num}</span>
                      {service.title}
                    </h2>
                    <p className="service-para">{service.description}</p>
                  </Link>
                ) : (
                  <div
                    className={`service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${service.animationOrder}`}
                    key={service.id}
                  >
                    <h2 className="service-card-num">
                      <span>{service.num}</span>
                      {service.title}
                    </h2>
                    <p className="service-para">{service.description}</p>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
