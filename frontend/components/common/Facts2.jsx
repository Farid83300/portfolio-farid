import { counters } from "@/data/facts";
import React from "react";
import OdometerComponent from "./OdometerComponent";

export default function Facts2() {
  return (
    <div className="counter-funfacts-area tmp-section-gapBottom">
      <div className="container">
        <div className="row g-5">
          {counters.map((item, i) => (
            <div key={i} className="col-lg-3 col-sm-6 col-12">
              <div
                className={`counter-card tmp-scroll-trigger tmp-fade-in tmponhover animation-order-${item.order}`}
              >
                <h3 className="counter counter-title">
                  <OdometerComponent max={item.count} /> {item.suffix}
                </h3>
                <p className="counter-para">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
