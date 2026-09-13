'use client';

import { useEffect } from 'react';
import { API_URL } from '@/lib/publicApi';

// SÉCURITÉ/PERF: getPost/getProject/getService sont mis en cache par Next.js
// (ISR, revalidate 1h) pour les perfs — un POST distinct, jamais caché, est
// donc nécessaire pour compter une vue à chaque affichage réel de la page,
// plutôt qu'au mieux une fois par heure et par article/projet/service.
export default function ViewTracker({ type, slug }) {
    useEffect(() => {
        if (!slug) return;

        fetch(`${API_URL}/${type}/${slug}/view`, { method: 'POST' }).catch(() => {});
    }, [type, slug]);

    return null;
}
