'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/adminApi';

const IDLE_TIMEOUT_MS = 60 * 60 * 1000; // 60 minutes
const ACTIVITY_EVENTS = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

// SÉCURITÉ: déconnexion auto après une longue inactivité, même onglet resté
// ouvert — le renouvellement silencieux du token (adminFetch + refresh)
// gardait sinon une session admin valide indéfiniment tant que l'onglet
// restait ouvert, y compris oubliée toute une nuit.
export default function IdleLogout() {
    const router = useRouter();
    const timerRef = useRef(null);

    useEffect(() => {
        function handleIdle() {
            logout().finally(() => {
                router.replace('/admin/login?reason=idle');
            });
        }

        function resetTimer() {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(handleIdle, IDLE_TIMEOUT_MS);
        }

        ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, resetTimer, { passive: true }));
        resetTimer();

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, resetTimer));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
