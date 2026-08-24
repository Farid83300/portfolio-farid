"use client";

export default function Comment() {
  return (
    <div className="blog-details-form-wrapper tmponhover">
      <h4 className="title">Leave a comment</h4>
      <span className="subtitle">
        By using form u agree with the message sorage, you can contact us
        directly now
      </span>
      <form onSubmit={(e) => e.preventDefault()} className="blog-details-form">
        <div className="single-input">
          <label>Your Name</label>
          <input type="text" placeholder="Name" />
        </div>
        <div className="single-input">
          <label>Your Email</label>
          <input type="text" placeholder="Email" />
        </div>
        <label>Message</label>
        <textarea placeholder="Message here.." defaultValue={""} />
        <div className="blog-submit-btn mt--40">
          <div className="tmp-button-here">
            <a
              className="tmp-btn hover-icon-reverse radius-round w-100"
              href="#"
            >
              <span className="icon-reverse-wrapper">
                <span className="btn-text">Submit Now</span>
                <span className="btn-icon">
                  <i className="fa-sharp fa-regular fa-arrow-right" />
                </span>
                <span className="btn-icon">
                  <i className="fa-sharp fa-regular fa-arrow-right" />
                </span>
              </span>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
