import sanitizeHtml from 'sanitize-html';

// Nettoie le HTML riche saisi par l'admin (champ "Contenu (HTML)" de PostForm.jsx)
// avant un rendu via dangerouslySetInnerHTML côté visiteur public — protège contre le
// XSS stocké si une session admin est compromise/négligente. `sanitize-html` (parseur
// pur JS, pas d'émulation DOM type jsdom) est utilisé plutôt que `isomorphic-dompurify`
// car ce dernier dépend de jsdom, dont une dépendance profonde (`@exodus/bytes`,
// publiée en ESM pur) fait planter le bundling serverless de Vercel avec
// `ERR_REQUIRE_ESM` dès que le sanitize tourne côté serveur — 500 systématique sur
// /blog-details/[slug] en production (jamais reproduit en local, propre à
// l'environnement de build/exécution de Vercel).
export function sanitizeContentHtml(html) {
    return sanitizeHtml(html || '', {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            a: ['href', 'name', 'target', 'rel'],
            img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
            '*': ['class'],
        },
    });
}
