import { slugify } from '@/utils/slugify';

export const services = [
    {
        id: 1,
        icon: 'fa-solid fa-code',
        title: 'Web Developer',
        projects: '16 Projets',
        animationOrder: '1',
    },
    {
        id: 2,
        icon: 'fa-light fa-bezier-curve',
        title: 'SaaS Developer',
        projects: '8 Projets',
        animationOrder: '2',
    },
    {
        id: 3,
        icon: 'fa-brands fa-wordpress-simple',
        title: 'WordPress Developer',
        projects: '9 Projets',
        animationOrder: '3',
    },
    {
        id: 4,
        icon: 'fa-light fa-pen-ruler',
        title: 'Ui/UX Design',
        projects: '5 Projets',
        animationOrder: '4',
    },
].map((elm) => {
    return {
        ...elm,
        slug: slugify(elm.title),
    };
});

export const services2 = [
    {
        id: 1,
        num: '01.',
        title: 'Développement sur mesure PHP / React',
        description:
            'Vous avez un besoin spécifique qu\'un thème ne peut pas couvrir ? Je développe des applications web robustes avec une architecture MVC propre, en PHP orienté objet et React.',
        animationOrder: '1',
        isLink: true,
        column: 1,
    },
    {
        id: 2,
        num: '02.',
        title: 'Création de site WordPress',
        description:
            'Je conçois des sites clairs, rapides et optimisés pour le référencement — vitrine, blog ou catalogue. Chaque projet est pensé pour convertir vos visiteurs en clients.',
        animationOrder: '2',
        isLink: true,
        column: 1,
    },
    {
        id: 3,
        num: '03.',
        title: 'Boutique e-commerce',
        description:
            'Je crée ou améliore votre boutique en ligne avec WooCommerce : catalogue produits, paiement sécurisé, tunnel de commande optimisé et interface d\'administration simple à prendre en main.',
        animationOrder: '3',
        isLink: true,
        column: 1,
    },
    {
        id: 4,
        num: '04.',
        title: 'SEO & optimisation des performances',
        description:
            "Un beau site ne sert à rien s'il n'est pas trouvé. J'optimise votre visibilité sur Google, la vitesse de chargement et les signaux techniques qui font la différence.",
        animationOrder: '4',
        isLink: false,
        column: 2,
    },
    {
        id: 5,
        num: '05.',
        title: 'Maintenance & support technique',
        description:
            "Je prends en charge les mises à jour, sauvegardes, corrections de bugs et la sécurité de votre site. Vous gérez votre activité, je m'occupe du reste.",
        animationOrder: '5',
        isLink: false,
        column: 2,
    },
    {
        id: 6,
        num: '06.',
        title: 'Refonte de site web',
        description:
            'Votre site est vieillissant, lent ou peu lisible sur mobile ? Je diagnostique, modernise et optimise votre présence en ligne sans repartir de zéro si ce n\'est pas nécessaire.',
        animationOrder: '6',
        isLink: false,
        column: 2,
    },
].map((elm) => {
    return {
        ...elm,
        slug: slugify(elm.title),
    };
});

export const services3 = [
    {
        id: 1,
        icon: 'feather-cast',
        title: 'UI/UX',
        description: 'Passages there are many variations variations of of Lorem available.',
    },
    {
        id: 2,
        icon: 'feather-map',
        title: 'App',
        description: 'Variations There are many variations of passages of Lorem available.',
    },
    {
        id: 3,
        icon: 'feather-phone-call',
        title: 'Support',
        description: 'There are many variations of passages of Lorem available pro ability.',
    },
].map((elm) => {
    return {
        ...elm,
        slug: slugify(elm.title),
    };
});

export const services4 = [
    {
        id: 1,
        num: '01.',
        title: 'Développement sur mesure PHP / React',
        description:
            'Vous avez un besoin spécifique qu\'un thème ne peut pas couvrir ? Je développe des applications web robustes avec une architecture MVC propre, en PHP orienté objet et React.',
        animationOrder: 1,
        column: 1,
    },
    {
        id: 2,
        num: '02.',
        title: 'Création de site WordPress',
        description:
            'Je conçois des sites clairs, rapides et optimisés pour le référencement — vitrine, blog ou catalogue. Chaque projet est pensé pour convertir vos visiteurs en clients.',
        animationOrder: 2,
        column: 1,
    },
    {
        id: 3,
        num: '03.',
        title: 'Boutique e-commerce',
        description:
            'Je crée ou améliore votre boutique en ligne avec WooCommerce : catalogue produits, paiement sécurisé, tunnel de commande optimisé et interface d\'administration simple à prendre en main.',
        animationOrder: 3,
        column: 1,
    },
    {
        id: 4,
        num: '04.',
        title: 'Refonte de site web',
        description:
            "Votre site est vieillissant, lent ou peu lisible sur mobile ? Je diagnostique, modernise et optimise votre présence en ligne sans repartir de zéro si ce n'est pas nécessaire.",
        animationOrder: 4,
        column: 2,
    },
    {
        id: 5,
        num: '05.',
        title: 'Maintenance & support technique',
        description:
            "Vous avez besoin d'une maintenance régulière ou de support technique pour votre site web ? Je vous propose des solutions adaptées à vos besoins.",
        animationOrder: 5,
        column: 2,
    },
    {
        id: 6,
        num: '06.',
        title: 'SEO & optimisation des performances',
        description:
            "Un beau site ne sert à rien s'il n'est pas trouvé. J'optimise votre visibilité sur Google, la vitesse de chargement et les signaux techniques qui font la différence.",
        animationOrder: 6,
        column: 2,
    },
].map((elm) => {
    return {
        ...elm,
        slug: slugify(elm.title),
    };
});

export const serviceCards = [
    {
        title: 'A Portfolio of Creativity',
        description:
            'Business consulting consultants provide expert advice and guida the a businesses to help theme their performance efficiency',
    },
    {
        title: 'My Portfolio of Innovation',
        description:
            'My work is driven by the belief that thoughtful design and strategic planning can empower brands, transform businesses',
    },
    {
        title: 'A Showcase of My Projects',
        description:
            'In this portfolio, you’ll find a curated selection of projects that highlight my skills in [Main Areas, e.g., responsive web design',
    },
];

export const services5 = [
    {
        title: 'A Portfolio of Creativity',
        description:
            'Business consulting consultants provide expert advice and guida the a businesses to help theme their performance efficiency',
    },
    {
        title: 'My Portfolio of Innovation',
        description:
            'My work is driven by the belief that thoughtful design and strategic planning can empower brands, transform businesses',
    },
    {
        title: 'A Showcase of My Projects',
        description:
            'In this portfolio, you’ll find a curated selection of projects that highlight my skills in [Main Areas, e.g., responsive web design',
    },
];
export const serviceCards2 = [
    {
        number: '01.',
        title: 'A Portfolio of Creativity',
        description:
            'Business consulting consultants provide expert advice and guida the a businesses to help theme their performance efficiency',
    },
    {
        number: '02.',
        title: 'My Portfolio of Innovation',
        description:
            'My work is driven by the belief that thoughtful design and strategic planning can empower brands, transform businesses',
    },
    {
        number: '03.',
        title: 'A Showcase of My Projects',
        description:
            'In this portfolio, you’ll find a curated selection of projects that highlight my skills in [Main Areas, e.g., responsive web design',
    },
];

export const serviceCards3 = [
    {
        iconClass: 'fa-regular fa-code',
        title: 'Ui/Ux Design',
        description:
            'Each one showcases my approach and dedication to detail, creativity Each one showcases my approach and dedication to detail, creativity',
        animationOrder: 4,
    },
    {
        iconClass: 'fa-light fa-palette',
        title: 'Web Development',
        description:
            'Business consulting consul us to a provide expert advice businesses Each one showcases my approach and dedication to detail, creativity',
        animationOrder: 5,
    },
    {
        iconClass: 'fa-light fa-print',
        title: 'Business Solutions',
        description:
            'Each one showcases my approach and dedication to detail, creativity Each one showcases my approach and dedication to detail, creativity',
        animationOrder: 4,
    },
    {
        iconClass: 'fa-regular fa-handshake',
        title: 'Profit Partners',
        description:
            'Business consulting consul us to a provide expert advice businesses Each one showcases my approach and dedication to detail, creativity',
        animationOrder: 5,
    },
];
export const allServices = [...services, ...services2, ...services3, ...services4];
