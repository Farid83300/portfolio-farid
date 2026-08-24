"use client";
import Image from "next/image";
export default function Contact() {
  return (
    <div className="contact-area-left-portfolio-fixed finance banner-personal-portfolio signle-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-header pb--20">
              <h4 className="subtitle wow move-right">
                <i className="fa-regular fa-envelope" /> CONTACT
              </h4>
              <h2 className="title tmp-title-split">
                Let's Work <span>Together!</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row g-5 mt--10">
              <div className="col-lg-5 mt_md--30 mt_sm--30">
                <div className="thumbnail">
                  <Image
                    className="w-100 radius"
                    alt="About Images"
                    src="/assets/images/contact/01.webp"
                    width={750}
                    height={1366}
                  />
                </div>
              </div>
              <div className="col-lg-7">
                <form
                  className="contact-form-1 tmp-dynamic-form with-input-bg"
                  id="contact-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="form-group">
                    <input
                      type="text"
                      name="contact-name"
                      id="contact-name"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="contact-phone"
                      id="contact-phone"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="contact-email"
                      name="contact-email"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Your Subject"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="contact-message"
                      id="contact-message"
                      placeholder="Your Message"
                      defaultValue={""}
                    />
                  </div>
                  <div className="form-group mb--0">
                    <button
                      name="submit"
                      type="submit"
                      id="submit"
                      className="w-100 btn-default btn-large tmp-btn"
                    >
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
