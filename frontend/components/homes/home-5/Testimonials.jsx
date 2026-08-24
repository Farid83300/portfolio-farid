"use client";
import { testimonials3 } from "@/data/testimonials";
import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Testimonials() {
  return (
    <section className="testimonial-area tmp-section-gapTop">
      <div className="container">
        <h2 className="testimonial-custom-title end tmp-scroll-trigger tmp-fade-in animation-order-1">
          Testimonial
        </h2>
        <div className="row g-5">
          {/* Start Single Testimonial  */}
          <div className="col-lg-12">
            <div className="swiper-testimonials-area-wrapper-card">
              <Swiper
                className="swiper swiper-testimonials-2"
                {...{
                  slidesPerView: 2,
                  spaceBetween: 30,
                  navigation: {
                    nextEl: ".project-swiper-button-next",
                    prevEl: ".project-swiper-button-prev",
                  },
                  loop: true,
                  autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                  },
                  breakpoints: {
                    0: {
                      slidesPerView: 1,
                    },
                    500: {
                      slidesPerView: 2,
                    },
                  },
                }}
                modules={[Navigation, Autoplay]}
              >
                {testimonials3.map((elm, i) => (
                  <SwiperSlide key={i} className="swiper-slide">
                    <div
                      className={`testimonial-card tmponhover style-2 tmp-scroll-trigger animation-order-${elm.animationOrder}`}
                    >
                      <div className="content">
                        <div className="testimonital-icon">
                          <Image
                            alt="testimonial-icon"
                            src="/assets/images/icons/quote.svg"
                            width={70}
                            height={61}
                          />
                        </div>
                        <h2 className="text-doc">{elm.text}</h2>
                        <h3 className="card-title">{elm.name}</h3>
                        <p className="card-para">{elm.role}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          {/* End Single Testimonial  */}
        </div>
      </div>
    </section>
  );
}
