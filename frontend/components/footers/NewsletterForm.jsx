'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function NewsletterForm({ placeholder = 'Email Adress' }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/newsletter`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                toast.success('Merci pour votre inscription !', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setEmail('');
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.error || 'Oops, il y eu un problème!', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch {
            toast.error('Oops, il y eu un problème!', {
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
        <form onSubmit={handleSubmit} className="newsletter-form-1 mt--40">
            <input
                type="email"
                placeholder={placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
            />
            <button type="submit" className="form-icon" aria-label="S'inscrire" disabled={loading}>
                <i className="fa-regular fa-envelope" />
            </button>
        </form>
    );
}
