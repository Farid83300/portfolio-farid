-- Ajoute la table des services, gérable depuis l'admin (CRUD calqué sur `projects`).
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  icon VARCHAR(100) DEFAULT NULL,
  description TEXT DEFAULT NULL,
  sections JSON DEFAULT NULL,
  image VARCHAR(255) DEFAULT NULL,
  image_alt VARCHAR(255) DEFAULT NULL,
  meta_title VARCHAR(255) DEFAULT NULL,
  meta_description VARCHAR(300) DEFAULT NULL,
  sort_order INT DEFAULT 0,
  views_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Reprend les 6 services réels existants (jusque-là en dur dans frontend/data/services.js)
-- pour que /service et la page d'accueil continuent d'afficher le même contenu après la migration.
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
