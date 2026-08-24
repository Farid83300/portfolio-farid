"use client";
import emailjs from "@emailjs/browser";
import React, { useRef } from "react";
import { toast } from "react-toastify";

import Image from "next/image";
export default function Contact3() {
  const form = useRef();

  const sandMail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        // EmailJS service ID - identifies which email service to use
        "service_cyobi0y",

        // EmailJS template ID - specifies which email template to use
        "template_4nbexqj",

        // Reference to the HTML form element containing user input
        form.current,

        {
          // Public API key for authentication with EmailJS
          publicKey: "D79JdTqxXVCcQBXL4",
        }
      )
      .then((res) => {
        if (res.status == 200) {
          toast.success("Message Sent successfully!", {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          form.current.reset();
        } else {
          toast.error("Ops Message not Sent!", {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };
  return (
    <div className="tmp-contact-area" id="contacts">
      <div className="inner">
        <div className="contact-get-in-touch-wrap">
          <div className="section-head text-align-left mb--50">
            <h2 className="custom-title mb--20 tmp-scroll-trigger tmp-fade-in animation-order-1">
              GET IN TOUCH
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
          <div className="contact-inner">
            <div className="contact-form">
              <form id="contact-form" ref={form} onSubmit={sandMail}>
                <div className="contact-form-wrapper row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        className="input-field"
                        name="contact-name"
                        placeholder="Your Name"
                        id="contact-name"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        className="input-field"
                        name="contact-email"
                        placeholder="Your Email"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        className="input-field"
                        name="contact-phone"
                        placeholder="Phone Number"
                        type="number"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        className="input-field"
                        type="text"
                        id="subject"
                        placeholder="Subject"
                        name="Subject"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        className="input-field"
                        placeholder="Your Message"
                        name="contact-message"
                        id="contact-message"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button
                      type="submit"
                      className="tmp-btn hover-icon-reverse radius-round w-100"
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">Appointment Now</span>
                        <span className="btn-icon">
                          <i className="fa-sharp fa-regular fa-arrow-right" />
                        </span>
                        <span className="btn-icon">
                          <i className="fa-sharp fa-regular fa-arrow-right" />
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
