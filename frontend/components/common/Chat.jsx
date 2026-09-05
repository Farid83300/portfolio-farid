'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const initialForm = { name: '', email: '', message: '' };

export default function Chat() {
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
            const res = await fetch(`${API_URL}/chat-messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                toast.success('Message envoyé ! Je te réponds sous 24H par e-mail.', {
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
        <div className="ready-chatting-option tmp-ready-chat">
            <input type="checkbox" id="click" />
            <label htmlFor="click">
                <i className="fab fa-facebook-messenger" />
                <i className="fas fa-times" />
            </label>
            <div className="wrapper">
                <div className="head-text">Message Direct !</div>
                <div className="chat-box">
                    <div className="desc-text">
                        Une question te viens a l'esprit ? Je te répond sous 24H par E-mail !
                    </div>
                    <form className="tmp-dynamic-form" onSubmit={handleSubmit}>
                        <div className="field">
                            <input
                                className="input-field"
                                name="name"
                                placeholder="Ton Nom"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="field">
                            <input
                                className="input-field"
                                name="email"
                                placeholder="Ton Email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="field textarea">
                            <textarea
                                className="input-field"
                                placeholder="Ton Message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="field">
                            <button name="submit" type="submit" disabled={loading}>
                                {loading ? 'Envoi...' : 'Envoi'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
