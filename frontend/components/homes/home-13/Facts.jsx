import OdometerComponent from "@/components/common/OdometerComponent";
import { countData } from "@/data/facts";
import React from "react";

export default function Facts() {
  return (
    <div className="counterup-area-personal tmp-section-gapBottom">
      <div className="row g-5">
        {countData.map((item, index) => (
          <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={index}>
            <div className="count-box counter-style-2 border-style small-radious text-center">
              <div>
                <h3 className="count-number tmponhover">
                  <OdometerComponent max={item.count} />
                </h3>
              </div>
              <h5 className="title">{item.title}</h5>
              <p className="description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
