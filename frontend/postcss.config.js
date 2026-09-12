// Config PostCSS personnalisée : nécessaire pour brancher PurgeCSS sur le
// pipeline CSS de Next.js. Next.js n'applique ses plugins par défaut
// (postcss-flexbugs-fixes, postcss-preset-env) QUE s'il n'existe aucun fichier
// de config personnalisé — dès qu'on en ajoute un, on est responsable de les
// réinclure nous-mêmes, sinon les préfixes vendeurs (-webkit-, autoprefixer...)
// disparaissent silencieusement du CSS de prod.
const plugins = {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
        autoprefixer: {
            flexbox: 'no-2009',
        },
        stage: 3,
        features: {
            'custom-properties': false,
        },
    },
};

// PurgeCSS uniquement au build de prod : en dev, `next dev` réinjecte des
// classes/styles à la volée (Fast Refresh) et une purge y casserait le style
// de façon imprévisible sans aucun bénéfice (le poids du bundle dev n'est pas
// ce qui compte pour les utilisateurs finaux).
if (process.env.NODE_ENV === 'production') {
    plugins['@fullhuman/postcss-purgecss'] = {
        content: [
            './app/**/*.{js,jsx}',
            './components/**/*.{js,jsx}',
            './data/**/*.js',
        ],
        defaultExtractor: (content) => content.match(/[\w-/:%]+(?<!:)/g) || [],
        safelist: {
            // Correspondance EXACTE requise (pas de préfixe) : classes
            // génériques utilitaires générées par FontAwesome lui-même
            // (accessibilité "sr-only") — un premier build a montré que le
            // motif /^fa/ seul ne les couvre pas car elles ne commencent pas
            // par "fa" dans FontAwesome bien qu'elles vivent dans son propre
            // CSS. Vérifié par diff binaire : avec cet ajout, le segment
            // FontAwesome ressort BYTE-FOR-BYTE identique avant/après purge.
            standard: [
                'html',
                'body',
                'active',
                'show',
                'fade',
                'collapse',
                'collapsing',
                'disabled',
                'open',
                'sr-only',
                'sr-only-focusable',
            ],
            // greedy : si UN SEUL token d'un sélecteur composé matche le motif,
            // tout le sélecteur est conservé — nécessaire pour les classes
            // injectées à l'exécution par des libs tierces (jamais présentes
            // littéralement dans notre code source, donc invisibles pour le
            // scanner de contenu ci-dessus).
            greedy: [
                // SÉCURITÉ CONSIGNE : FontAwesome ne doit jamais être réduit,
                // quel que soit le gain technique possible — voir CLAUDE.md /
                // consigne explicite de l'utilisateur. Ce motif protège TOUTES
                // les classes FontAwesome (fa, fas, far, fal, fad, fab, fa-*).
                /^fa/,
                // Swiper (Testimonials.jsx, ProjectDetails.jsx) ajoute ses
                // classes d'état (swiper-slide-active, swiper-button-disabled...)
                // dynamiquement en JS, jamais écrites littéralement dans le JSX.
                /^swiper/,
                // Odometer (compteurs animés de Facts.jsx via OdometerComponent)
                // construit tout son DOM + classes en JS pur au runtime — un
                // premier build sans ce motif a fait disparaître les 13 classes
                // odometer-* du CSS, ce qui aurait cassé l'affichage des
                // compteurs chiffrés de la page d'accueil.
                /^odometer/,
                // react-toastify (toasts de succès/erreur sur tous les
                // formulaires publics) génère ses classes via sa propre lib.
                /^Toastify/,
                // WOW.js (Skills.jsx, Skills2.jsx) ajoute la classe "animated"
                // au scroll ; les noms d'animation eux-mêmes (fadeInUp, zoomIn...)
                // sont déjà littéraux dans le JSX donc détectés normalement.
                /^wow$/,
                /^animated$/,
                // Composants off-canvas (menu mobile, sidebar) et animations
                // "tmp-*" du template, certains togglés via des classes composées
                // par template literal — marge de sécurité.
                /^tmp-/,
                /^ft-/,
            ],
        },
    };
}

module.exports = { plugins };
