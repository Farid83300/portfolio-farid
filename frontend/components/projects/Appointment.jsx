"use client";

export default function Appointment() {
  return (
    <section className="get-in-touch-area pt--80">
      <div className="container p-0">
        <div className="contact-get-in-touch-wrap">
          <div className="get-in-touch-wrapper tmponhover">
            <div className="row g-5 align-items-center">
              <div className="col-lg-12">
                <div className="contact-inner">
                  <div className="contact-form">
                    <form
                      className="tmp-dynamic-form"
                      id="contact-form"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="contact-form-wrapper row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              className="input-field"
                              name="contact-name"
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
                              name="contact-phone"
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
                              name="contact-message"
                              id="contact-message"
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
