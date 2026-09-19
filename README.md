# Portfolio — Farid Zaffalone

Portfolio personnel de **Farid Zaffalone**, développeur freelance PHP/React & WordPress basé à Draguignan. Monorepo composé d'un frontend Next.js et d'une API PHP maison, avec un tableau de bord d'administration complet pour gérer articles, projets, services et messages sans jamais toucher à une base de données.

🔗 **[faridzaffalone.com](https://faridzaffalone.com)**

---

## Aperçu

- **Vitrine publique** — accueil, à propos, services, portfolio de projets, blog, contact — entièrement pilotée par le contenu saisi depuis l'admin.
- **Tableau de bord `/admin`** — CRUD complet sur les articles, projets, services, catégories et tags, modération des messages de contact, du chat et des commentaires, gestion de la newsletter, authentification à deux facteurs obligatoire.
- **API REST** en PHP pur, sans framework, consommée à la fois par le site public et par l'admin.

## Stack technique

**Frontend**
- [Next.js 15](https://nextjs.org/) (App Router), React 19
- SCSS + Bootstrap 5, animations GSAP / Swiper
- Rendu hybride ISR (revalidation horaire) + pages statiques pré-générées au build
- Déployé sur [Vercel](https://vercel.com/)

**Backend**
- PHP 8.1+, architecture MVC maison (routeur, contrôleurs, modèles), sans framework
- MySQL via PDO
- Authentification JWT + refresh tokens rotatifs, 2FA (TOTP) obligatoire pour l'admin
- Déployé sur hébergement mutualisé (o2switch)

## Fonctionnalités

- Blog, portfolio de projets et catalogue de services entièrement dynamiques (contenu API, pas de données statiques)
- Formulaire de contact, newsletter, chat en direct et commentaires d'articles, tous reliés au backend avec limitation de débit anti-spam
- Compteurs de vues par page, indépendants du cache de rendu
- Sanitisation systématique du contenu riche (HTML) saisi depuis l'admin avant affichage public
- SEO : URLs canoniques, sitemap et robots.txt générés dynamiquement à partir du contenu réel
- Consentement aux cookies conforme RGPD avant tout chargement d'outil de mesure d'audience
- Interface d'administration responsive (mobile → desktop), protégée par JWT et 2FA

## Structure du dépôt

```
.
├── frontend/   # Next.js — site public + interface /admin
└── backend/    # API PHP MVC
```

Chaque application est indépendante et se déploie séparément — voir leur `README` respectif pour les instructions détaillées.

## Démarrage en local

### Backend

```bash
cd backend
composer install
cp .env.example .env   # renseigner la connexion base de données + JWT_SECRET
```

Servir avec Apache (ex. MAMP) ou directement :

```bash
php -S localhost:8000 -t public
```

### Frontend

```bash
cd frontend
yarn install
cp .env.local.example .env.local   # NEXT_PUBLIC_API_URL vers le backend
yarn dev
```

Le site est alors accessible sur [http://localhost:3000](http://localhost:3000).

## Sécurité

Authentification JWT à courte durée de vie avec rotation des refresh tokens, 2FA obligatoire sur l'admin, limitation de débit sur tous les points d'entrée publics, validation stricte des fichiers uploadés (type MIME réel, pas seulement l'extension), en-têtes de sécurité (CSP, HSTS) et sanitisation systématique du contenu utilisateur avant tout rendu HTML.

## Licence

Projet personnel — tous droits réservés.
