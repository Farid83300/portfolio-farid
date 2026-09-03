export const pricingPlans = [
    {
        title: 'Starter',
        price: '700 - 1000 €',
        per: 'Projet unique · Livraison 7–10 jours',
        features: [
            'Site vitrine WordPress (5 pages)',
            'Template premium personnalisé',
            'Design responsive mobile',
            'Formulaire de contact',
            'SEO de base (balises, métadonnées)',
            '1 mois de support inclus',
        ],
        buttonStyle: 'btn-border',
        animationOrder: 1,
    },
    {
        title: 'Basic',
        price: '1200 - 2000 €',
        per: 'Projet unique · Livraison 2–3 semaines',
        features: [
            'Site WordPress sur mesure (10 pages)',
            'Intégration maquette Figma',
            "WooCommerce (jusqu'à 20 produits)",
            'SEO avancé + optimisation vitesse',
            'Blog & formulaires avancés',
            'Mise en ligne + conseil hébergement',
            '3 mois de support inclus',
        ],
        buttonStyle: '', // no border for 'active' one
        active: true,
        animationOrder: 2,
    },
    {
        title: 'Premium',
        price: '3000 - 6000 €',
        per: 'Sur devis · Délai selon cahier des charges',
        features: [
            'Application web PHP/React sur mesure',
            'Architecture MVC + API REST',
            'Base de données MySQL optimisée',
            'Espace client / authentification',
            'Architecture MVC + API REST',
            'Sécurité avancée (XSS, CSRF, injections)',
            'Design Figma fourni ou créé sur mesure',
            'Déploiement VPS + 6 mois de maintenance',
        ],
        buttonStyle: 'btn-border',
        animationOrder: 3,
    },
];

export const pricingPlans2 = [
    {
        title: 'Starter',
        icon: '/assets/images/pricing/pricing-logo-1.svg',
        features: [
            '5 Social Media Account',
            'Free Platform Access',
            'Free Platform Access',
            '24/7 Customer Support',
        ],
        price: '$ 5.00',
        active: false,
        borderedButton: true,
    },
    {
        title: 'Premium',
        icon: '/assets/images/pricing/pricing-logo-2.svg',
        features: [
            '5 Social Media Account',
            'Free Platform Access',
            '24/7 Customer Support',
            '24/7 Customer Support',
        ],
        price: '$ 230.00',
        active: true,
        borderedButton: false,
    },
    {
        title: 'Basic',
        icon: '/assets/images/pricing/pricing-logo-3.svg',
        features: [
            '5 Social Media Account',
            'Free Platform Access',
            'Digital Marketing',
            '24/7 Customer Support',
        ],
        price: '$ 45.00',
        active: false,
        borderedButton: true,
    },
];
