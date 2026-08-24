import React from "react";
import Image from "next/image";
import { counters2 } from "@/data/facts";
import OdometerComponent from "@/components/common/OdometerComponent";
export default function Hero() {
  return (
    <div className="rpp-banner-five-area">
      <div className="container">
        <div className="banner-five-main-wrapper">
          <div className="inner">
            <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-1 tmp-title-split">
              Hi, I am Brooklyn Simmons <br />a Product Designer
            </h1>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="bg-benner-img-five">
                <Image
                  className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                  alt="banner-img-3"
                  src="/assets/images/banner/banner-user-image-five.png"
                  width={459}
                  height={579}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 order-lg-1">
              <div className="banner-left-content">
                <div className="banner-counter">
                  <ul>
                    {counters2.map((item, index) => (
                      <li key={index}>
                        <div
                          className={`banner-counter-card tmp-scroll-trigger tmp-fade-in animation-order-${item.animationOrder}`}
                        >
                          <h4 className="counter title">
                            <OdometerComponent max={item.count} />
                            {item.suffix}
                          </h4>
                          <p className="para">{item.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 order-lg-3">
              <div className="banner-right-content">
                <div className="banner-contact-info">
                  <div className="contact-info tmp-scroll-trigger tmp-fade-in animation-order-1">
                    <h4 className="title">Biography :</h4>
                    <p className="para">
                      I'm a freelance product designer &amp; developer based in
                      London. I’m very passionate about the work I do.
                    </p>
                  </div>
                  <div className="contact-info tmp-scroll-trigger tmp-fade-in animation-order-2">
                    <h4 className="title">Contact :</h4>
                    <p className="para">1179 KFC Road,Lisbon, Portugal</p>
                    <p className="para">info@example.com</p>
                    <p className="para">(629) 555-0129</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-shape-img-bg">
        <Image
          alt="shape-img"
          src="/assets/images/banner/banner-shape-five-bg.png"
          width={1920}
          height={900}
        />
      </div>
    </div>
  );
}
