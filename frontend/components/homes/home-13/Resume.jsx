import { resumeListItems } from "@/data/education";
import React from "react";

export default function Resume() {
  return (
    <div className="tmp-section-gapBottom banner-personal-portfolio experience-style-list signle-section">
      <div className="section-header pb--20">
        <h4 className="subtitle wow move-right">
          <i className="fa-regular fa-user" /> My Resume
        </h4>
        <h2 className="title tmp-title-split">
          Education &amp; <span>Experience</span>
        </h2>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="content">
            <div className="experience-list">
              {resumeListItems.map((item, index) => (
                <div className="resume-single-list bg-card" key={index}>
                  <div className="inner">
                    <div className="heading">
                      <div className="title">
                        <h4>{item.title}</h4>
                        <span>{item.institution}</span>
                      </div>
                      <div className="date-of-time">
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <p className="description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
