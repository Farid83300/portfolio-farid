// SÉCURITÉ: origine de l'API backend, dérivée de la même variable d'env que
// lib/publicApi.js / lib/adminApi.js, pour construire la CSP ci-dessous — sans ça
// le script/style-src le plus strict casserait silencieusement tous les appels
// fetch() du site (formulaires publics + dashboard admin) vers ce domaine.
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const apiOrigin = new URL(apiUrl).origin;

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        quietDeps: true, // This will silence deprecation warnings
        silenceDeprecations: ['mixed-decls', 'legacy-js-api'],
    },
    images: {
        remotePatterns: [
            { protocol: 'http', hostname: 'localhost', port: '8888', pathname: '/portfolio-farid-backend/**' },
            { protocol: 'http', hostname: 'localhost', port: '8000', pathname: '/uploads/**' },
        ],
    },
    async headers() {
        const headers = [
            // SÉCURITÉ: en-têtes de durcissement de base — actifs en dev comme en prod,
            // aucun n'interfère avec `next dev`.
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ];

        // SÉCURITÉ: Content-Security-Policy — uniquement en production. `next dev` a
        // besoin d'exécuter du code via eval() pour le Fast Refresh (rechargement à
        // chaud) du webpack dev server ; une CSP sans 'unsafe-eval' casse le rendu de
        // TOUTES les pages en local (vérifié : 500 sur chaque route en `yarn dev`).
        // Plutôt que d'affaiblir la CSP prod avec 'unsafe-eval' pour ce seul besoin de
        // dev, elle n'est envoyée qu'au build de prod (`yarn build && yarn start`,
        // exactement ce que Vercel exécute), déjà vérifié sans erreur console/réseau.
        // Restreint les origines de script/style/connexion/image à celles réellement
        // utilisées (vérifiées dans le code : Google Analytics + Microsoft Clarity dans
        // CookieConsent.jsx, EmailJS dans Contact2.jsx, Google Fonts dans app/layout.js,
        // l'API backend elle-même). 'unsafe-inline' reste nécessaire pour script/style
        // tant que le site utilise des scripts inline (gtag/clarity) et des styles
        // injectés par les libs (Next/Sass/Bootstrap) sans système de nonce — ça
        // n'annule pas la CSP : elle bloque toujours le chargement de script/style/
        // connexion vers un domaine tiers non listé, le principal vecteur
        // d'exfiltration en cas de XSS.
        if (process.env.NODE_ENV === 'production') {
            headers.push({
                key: 'Content-Security-Policy',
                value: [
                    "default-src 'self'",
                    `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms`,
                    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
                    `font-src 'self' https://fonts.gstatic.com data:`,
                    `img-src 'self' data: blob: ${apiOrigin}`,
                    `connect-src 'self' ${apiOrigin} https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.clarity.ms https://api.emailjs.com`,
                    "object-src 'none'",
                    "base-uri 'self'",
                    "frame-ancestors 'none'",
                ].join('; '),
            });
        }

        return [{ source: '/:path*', headers }];
    },
};

export default nextConfig;
