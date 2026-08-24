import React from "react";
import Image from "next/image";
import { educationExperience } from "@/data/education";
import { jobExperience } from "@/data/experiences";
import { skillSections } from "@/data/skills";
export default function Resume() {
  return (
    <div className="tmp-resume-area" id="resume">
      <div className="inner">
        <div className="section-head text-align-left mb--50">
          <h2 className="custom-title mb--20 tmp-scroll-trigger tmp-fade-in animation-order-1">
            Education
            <span>
              <Image
                alt="custom-line"
                src="/assets/images/custom-line/custom-line.png"
                width={81}
                height={6}
              />
            </span>
          </h2>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Elevate your brand with a the
          </h2>
          <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
            ished fact that a reader will be distrol acted bioiiy desig ished
            fact that a reader <br />
            will acted ished fact that a reader will be distrol acted
          </p>
        </div>
        <div className="row g-5">
          {educationExperience.map((item, index) => (
            <div className="col-lg-6 col-sm-6" key={index}>
              <div
                className={`education-experience-card tmp-scroll-trigger tmponhover tmp-fade-in animation-order-${
                  index + 1
                }`}
              >
                <h4 className="edu-sub-title">{item.title}</h4>
                <h2 className="edu-title">{item.duration}</h2>
                <p className="edu-para">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="inner pt--60">
        <h2 className="custom-title mb--30 tmp-scroll-trigger tmp-fade-in animation-order-1">
          Experience
          <span>
            <Image
              alt="custom-line"
              src="/assets/images/custom-line/custom-line.png"
              width={81}
              height={6}
            />
          </span>
        </h2>
        <div className="row g-5">
          {jobExperience.map((item, index) => (
            <div className="col-lg-6 col-sm-6" key={index}>
              <div
                className={`education-experience-card tmp-scroll-trigger tmponhover tmp-fade-in animation-order-${
                  index + 1
                }`}
              >
                <h4 className="edu-sub-title">{item.title}</h4>
                <h2 className="edu-title">{item.duration}</h2>
                <p className="edu-para">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="inner pt--60">
        <div className="row">
          {skillSections.map((section, sectionIndex) => (
            <div className="col-lg-6" key={sectionIndex}>
              <div className="progress-wrapper">
                <div className="content">
                  <h2 className="custom-title mb--30 tmp-scroll-trigger tmp-fade-in animation-order-1">
                    {section.title}
                    <span>
                      <Image
                        alt="custom-line"
                        src="/assets/images/custom-line/custom-line.png"
                        width={81}
                        height={6}
                      />
                    </span>
                  </h2>
                  {section.skills.map((skill, skillIndex) => (
                    <div className="progress-charts" key={skillIndex}>
                      <h6 className="heading heading-h6">{skill.name}</h6>
                      <div className="progress">
                        <div
                          className="progress-bar wow fadeInLeft"
                          data-wow-duration={skill.duration}
                          data-wow-delay={skill.delay}
                          role="progressbar"
                          style={{
                            width: `${skill.percent}%`,
                            visibility: "visible",
                            animationDuration: skill.duration,
                            animationDelay: skill.delay,
                            animationName: "fadeInLeft",
                          }}
                          aria-valuenow={skill.percent}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <span className="percent-label">
                            {skill.percent}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
