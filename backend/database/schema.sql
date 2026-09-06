-- Schéma complet de la base portfolio_farid, cumul de migrations.sql
-- à migrations_v6.sql (généré le 2026-09-06 depuis la base locale à jour).
--
-- À utiliser pour créer une base neuve en une seule fois (nouvelle machine,
-- mise en prod). Les fichiers migrations_v2.sql..v6.sql restent en place
-- pour l'historique et pour faire évoluer une base déjà existante — mais si
-- une future migrations_v7.sql change le schéma, pense à répercuter le
-- changement ici aussi, ce fichier ne se met pas à jour tout seul.

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------------------------
-- Auth admin (2FA obligatoire)
-- --------------------------------------------------------------------------
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `totp_secret` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `totp_enabled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `rate_limits` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` int NOT NULL DEFAULT '0',
  `locked_until` datetime DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Blog (articles, catégories, tags, commentaires)
-- --------------------------------------------------------------------------
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('draft','published','archived') COLLATE utf8mb4_unicode_ci DEFAULT 'draft',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `category_id` int DEFAULT NULL,
  `featured_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `featured_image_alt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `views_count` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `fk_posts_category` (`category_id`),
  CONSTRAINT `fk_posts_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `post_tags` (
  `post_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`post_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `post_tags_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `post_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `author_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Portfolio (projets)
-- --------------------------------------------------------------------------
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `client` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `project_date` date DEFAULT NULL,
  `tags` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `features` json DEFAULT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `live_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gallery` json DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `views_count` int DEFAULT '0',
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Services (contenu réel repris de frontend/data/services.js, voir seed
-- ci-dessous — identique à celui de migrations_v5.sql)
-- --------------------------------------------------------------------------
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('draft','published') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `icon` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `sections` json DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_alt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  `views_count` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Messages entrants (contact, chat, newsletter)
-- --------------------------------------------------------------------------
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `chat_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `newsletter_subscribers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscribed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `unsubscribed_at` timestamp NULL DEFAULT NULL,
  `viewed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------------------------------
-- Seed : contenu réel des 6 services (identique à migrations_v5.sql, pour
-- que /service et la home affichent tout de suite le vrai contenu sur une
-- base neuve).
-- --------------------------------------------------------------------------
INSERT INTO services (title, slug, status, icon, description, sections, sort_order) VALUES
(
  'Développement sur mesure PHP / React',
  'dveloppement-sur-mesure-php-react',
  'published',
  'fa-solid fa-code',
  'Vous avez un besoin spécifique qu\'un thème ne peut pas couvrir ? Je développe des applications web robustes avec une architecture MVC propre, en PHP orienté objet et React.',
  JSON_ARRAY(
    JSON_OBJECT('heading', 'Ce que comprend ce service', 'paragraphs', JSON_ARRAY('[Texte à personnaliser] Détaillez les technologies, la méthodologie ou les étapes de ce service.')),
    JSON_OBJECT('heading', 'Pourquoi me choisir', 'paragraphs', JSON_ARRAY('[Texte à personnaliser] Mettez en avant votre expérience, vos références ou vos garanties sur ce type de prestation.'))
  ),
  1
),
(
  'Création de site WordPress',
  'cration-de-site-wordpress',
  'published',
  'fa-brands fa-wordpress-simple',
  'Je conçois des sites clairs, rapides et optimisés pour le référencement — vitrine, blog ou catalogue. Chaque projet est pensé pour convertir vos visiteurs en clients.',
  JSON_ARRAY(
    JSON_OBJECT('heading', 'Ce que comprend ce service', 'paragraphs', JSON_ARRAY('[Texte à personnaliser] Détaillez les technologies, la méthodologie ou les étapes de ce service.')),
    JSON_OBJECT('heading', 'Pourquoi me choisir', 'paragraphs', JSON_ARRAY('[Texte à personnaliser] Mettez en avant votre expérience, vos références ou vos garanties sur ce type de prestation.'))
  ),
  2
),
(
  'Boutique e-commerce',
  'boutique-e-commerce',
  'published',
  'fa-solid fa-cart-shopping',
  'Je crée ou améliore votre boutique en ligne avec WooCommerce : catalogue produits, paiement sécurisé, tunnel de commande optimisé et interface d\'administration simple à prendre en main.',
  JSON_ARRAY(
    JSON_OBJECT('heading', 'Ce que comprend ce service', 'paragraphs', JSON_ARRAY('[Texte à personnaliser] Détaillez les technologies, la méthodologie ou les étapes de ce service.')),
    JSON_OBJECT('heading', 'Pourquoi me choisir', 'paragraphs', JSON_ARRAY('[Texte à personnaliser] Mettez en avant votre expérience, vos références ou vos garanties sur ce type de prestation.'))
  ),
  3
),
(
  'Refonte de site web',
  'refonte-de-site-web',
  'published',
  'fa-solid fa-arrows-rotate',
  'Votre site est vieillissant, lent ou peu lisible sur mobile ? Je diagnostique, modernise et optimise votre présence en ligne sans repartir de zéro si ce n\'est pas nécessaire.',
  JSON_ARRAY(
    JSON_OBJECT('heading', 'Ce que comprend ce service', 'paragraphs', JSON_ARRAY('[Texte à personnaliser] Détaillez les technologies, la méthodologie ou les étapes de ce service.')),
    JSON_OBJECT('heading', 'Pourquoi me choisir', 'paragraphs', JSON_ARRAY('[Texte à personnaliser] Mettez en avant votre expérience, vos références ou vos garanties sur ce type de prestation.'))
  ),
  4
),
(
  'Maintenance & support technique',
  'maintenance-support-technique',
  'published',
  'fa-solid fa-screwdriver-wrench',
  'Vous avez besoin d\'une maintenance régulière ou de support technique pour votre site web ? Je vous propose des solutions adaptées à vos besoins.',
  JSON_ARRAY(
    JSON_OBJECT('heading', 'Ce que comprend ce service', 'paragraphs', JSON_ARRAY('[Texte à personnaliser] Détaillez les technologies, la méthodologie ou les étapes de ce service.')),
    JSON_OBJECT('heading', 'Pourquoi me choisir', 'paragraphs', JSON_ARRAY('[Texte à personnaliser] Mettez en avant votre expérience, vos références ou vos garanties sur ce type de prestation.'))
  ),
  5
),
(
  'SEO & optimisation des performances',
  'seo-optimisation-des-performances',
  'published',
  'fa-solid fa-chart-line',
  'Un beau site ne sert à rien s\'il n\'est pas trouvé. J\'optimise votre visibilité sur Google, la vitesse de chargement et les signaux techniques qui font la différence.',
  JSON_ARRAY(
    JSON_OBJECT('heading', 'Ce que comprend ce service', 'paragraphs', JSON_ARRAY('[Texte à personnaliser] Détaillez les technologies, la méthodologie ou les étapes de ce service.')),
    JSON_OBJECT('heading', 'Pourquoi me choisir', 'paragraphs', JSON_ARRAY('[Texte à personnaliser] Mettez en avant votre expérience, vos références ou vos garanties sur ce type de prestation.'))
  ),
  6
);
