"use client";
import emailjs from "@emailjs/browser";
import React, { useRef } from "react";
import { toast } from "react-toastify";

export default function Contact({
  parentClass = "get-in-touch-area tmp-section-gapTop",
}) {
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
    <section className={parentClass} id="contacts">
      <div className="container">
        <div className="contact-get-in-touch-wrap">
          <div className="get-in-touch-wrapper tmponhover">
            <div className="row g-5 align-items-center">
              <div className="col-lg-5">
                <div className="section-head text-align-left">
                  <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                    <span className="subtitle">GET IN TOUCH</span>
                  </div>
                  <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                    Elevate your brand with Me
                  </h2>
                  <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
                    ished fact that a reader will be distrol acted bioiiy desig
                    ished fact that a reader will acted ished fact that a reader
                    will be distrol acted
                  </p>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="contact-inner">
                  <div className="contact-form">
                    <div id="form-messages" className="error" />
                    <form
                      className="tmp-dynamic-form"
                      id="contact-form"
                      ref={form}
                      onSubmit={sandMail}
                    >
                      <div className="contact-form-wrapper row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              className="input-field"
                              name="name"
                              id="contact-name"
                              placeholder="Your Name"
                              type="text"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              className="input-field"
                              id="contact-phone"
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
                              id="contact-email"
                              name="email"
                              placeholder="Your Email"
                              type="email"
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
                              name="subject"
                              placeholder="Subject"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <textarea
                              className="input-field"
                              placeholder="Your Message"
                              name="message"
                              id="contact-message"
                              required
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="tmp-button-here">
                            <button
                              className="tmp-btn hover-icon-reverse radius-round w-100"
                              name="submit"
                              type="submit"
                              id="submit"
                            >
                              <span className="icon-reverse-wrapper">
                                <span className="btn-text">
                                  Appointment Now
                                </span>
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
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
