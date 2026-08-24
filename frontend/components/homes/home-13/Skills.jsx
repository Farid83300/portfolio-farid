import React from "react";
import Image from "next/image";
import { skills } from "@/data/skills";
import OdometerComponent from "@/components/common/OdometerComponent";
export default function Skills() {
  return (
    <div className="tmp-service-area tmp-section-gapBottom banner-personal-portfolio signle-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-header pb--20">
              <h4 className="subtitle wow move-right">
                <i className="fa-solid fa-layer-group" /> My Skill
              </h4>
              <h2 className="title tmp-title-split">
                My <span>Specializations</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row g-5 skills-wrapper text-center">
          {skills.map((item, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
              <div className="skill-style-border-card tmponhover">
                <div className="skill-inner">
                  <Image
                    alt={item.alt}
                    src={item.src}
                    width={item.width}
                    height={item.height}
                  />
                  <h3 className="count-number">
                    <OdometerComponent max={item.count} /> %
                  </h3>
                  <p className="name">{item.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
