'use client';
import React, { useRef } from 'react';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Contact({ parentClass = 'get-in-touch-area tmp-section-gapTop' }) {
    const form = useRef();

    const sandMail = async (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);

        try {
            const res = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    subject: formData.get('subject'),
                    message: formData.get('message'),
                }),
            });

            if (res.ok) {
                toast.success('Message Envoyé avec succès!', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                form.current.reset();
            } else {
                toast.error('Ops, il y a eu un problème!', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch {
            toast.error('Ops, il y a eu un problème!', {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
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
                                        <span className="subtitle">Contactez-moi</span>
                                    </div>
                                    <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                                        Parlons de ton projet...
                                    </h2>
                                    <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
                                        Tu as un projet en tête ? Discutons-en ensemble. Je te réponds sous 24h pour étudier tes besoins et te proposer la solution la plus adaptée à ton budget.
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
                                                            placeholder="Ton Nom"
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
                                                            placeholder="Ton Téléphone"
                                                            type="tel"
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
                                                            placeholder="Ton Email"
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
                                                            placeholder="Sujet"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <textarea
                                                            className="input-field"
                                                            placeholder="Ton Message"
                                                            name="message"
                                                            id="contact-message"
                                                            required
                                                            defaultValue={''}
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
                                                                    Envoi
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
