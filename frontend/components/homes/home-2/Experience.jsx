import { educationResumeItems } from "@/data/education";
import { resumeItems } from "@/data/experiences";
import React from "react";

export default function Experience() {
  return (
    <section className="resume-section tmp-section-gapTop" id="resume-section">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="section-header mb--50 tmp-scroll-trigger tmp-fade-in animation-order-1">
              <h2 className="section-title">
                <i className="fa-regular fa-award" /> My Experience
              </h2>
            </div>
            <div className="resume-widget">
              {resumeItems.map((item, index) => (
                <div
                  key={index}
                  className={`resume-single tmp-scroll-trigger tmp-fade-in animation-order-${
                    index + 1
                  } ${item.isLast ? "mb--0" : ""}`}
                >
                  <div className="time">
                    <i className="fa-duotone fa-solid fa-circle-dot fa-fade mr--15" />
                    {item.duration}
                  </div>
                  <h3 className="resume-title">{item.title}</h3>
                  <div className="institute">{item.institute}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <div className="section-header mb--50 tmp-scroll-trigger tmp-fade-in animation-order-1">
              <h2 className="section-title">
                <i className="fa-regular fa-graduation-cap" /> My Education
              </h2>
            </div>
            <div className="resume-widget">
              {educationResumeItems.map((item, index) => (
                <div
                  key={index}
                  className={`resume-single tmp-scroll-trigger tmp-fade-in animation-order-${
                    index + 1
                  } ${item.isLast ? "mb--0" : ""}`}
                >
                  <div className="time">
                    <i className="fa-duotone fa-solid fa-circle-dot fa-fade mr--15" />
                    {item.duration}
                  </div>
                  <h3 className="resume-title">{item.title}</h3>
                  <div className="institute">{item.institute}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
