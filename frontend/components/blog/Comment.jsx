'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const initialForm = { name: '', email: '', message: '' };

export default function Comment({ postId }) {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ post_id: postId, ...form }),
            });

            if (res.ok) {
                toast.success('Commentaire envoyé ! Il sera visible après validation.', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setForm(initialForm);
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.error || 'Oops, il y a eu un problème !', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch {
            toast.error('Oops, il y a eu un problème !', {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="blog-details-form-wrapper tmponhover">
            <h4 className="title">Laisser un commentaire</h4>
            <span className="subtitle">
                En utilisant le formulaire, vous acceptez le stockage des messages, vous pouvez nous
                contacter directement maintenant
            </span>
            <form onSubmit={handleSubmit} className="blog-details-form">
                <div className="single-input">
                    <label>Ton Nom</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nom"
                        value={form.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="single-input">
                    <label>Ton Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>
                <label>Message</label>
                <textarea
                    name="message"
                    placeholder="Message..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                <div className="blog-submit-btn mt--40">
                    <div className="tmp-button-here">
                        <button
                            type="submit"
                            className="tmp-btn hover-icon-reverse radius-round w-100"
                            disabled={loading}
                        >
                            <span className="icon-reverse-wrapper">
                                <span className="btn-text">{loading ? 'Envoi...' : 'Envoyez'}</span>
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
    );
}
