'use client';

export default function Comment() {
    return (
        <div className="blog-details-form-wrapper tmponhover">
            <h4 className="title">Laisser un commentaire</h4>
            <span className="subtitle">
                En utilisant le formulaire, vous acceptez le stockage des messages, vous pouvez nous
                contacter directement maintenant
            </span>
            <form onSubmit={(e) => e.preventDefault()} className="blog-details-form">
                <div className="single-input">
                    <label>Ton Nom</label>
                    <input type="text" placeholder="Nom" />
                </div>
                <div className="single-input">
                    <label>Ton Email</label>
                    <input type="text" placeholder="Email" />
                </div>
                <label>Message</label>
                <textarea placeholder="Message..." defaultValue={''} />
                <div className="blog-submit-btn mt--40">
                    <div className="tmp-button-here">
                        <a className="tmp-btn hover-icon-reverse radius-round w-100" href="#">
                            <span className="icon-reverse-wrapper">
                                <span className="btn-text">Envoyez</span>
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
