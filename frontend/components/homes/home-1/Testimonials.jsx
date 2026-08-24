"use client";
import { testimonials } from "@/data/testimonials";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
export default function Testimonials() {
  return (
    <section className="testimonial tmp-section-gapTop">
      <div className="testimonial-wrapper">
        <div className="container">
          <Swiper
            className="swiper testimonial-swiper"
            {...{
              // slidesPerView: 2,
              spaceBetween: 50,
              loop: true,
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
              breakpoints: {
                0: {
                  slidesPerView: 1,
                },
                800: {
                  slidesPerView: 2,
                },
              },
            }}
            modules={[Navigation]}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide className="swiper-slide" key={testimonial.id}>
                <div className="testimonial-card">
                  <div className="card-content-wrap">
                    <h2 className="text-doc">{testimonial.quote}</h2>
                    <h3 className="card-title">{testimonial.name}</h3>
                    <p className="card-para">{testimonial.role}</p>
                    <div className="testimonital-icon">
                      <Image
                        alt="testimonial-icon"
                        src="/assets/images/testimonial/testimonial-icon.svg"
                        width={110}
                        height={94}
                      />
                    </div>
                  </div>
                  <div className="testimonial-card-img">
                    <Image
                      className={`tmp-scroll-trigger tmp-zoom-in ${testimonial.animationClass}`}
                      alt="bg-image"
                      src={testimonial.bgImage}
                      width={testimonial.width}
                      height={testimonial.height}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* </div> */}
          <div className="testimonial-btn-next-prev">
            <div className="swiper-button-next">
              <i className="fa-solid fa-arrow-right" />
            </div>
            <div className="swiper-button-prev">
              <i className="fa-solid fa-arrow-left" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
