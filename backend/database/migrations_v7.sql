-- Image de secours affichée dans une modale sur la page détail projet quand
-- aucune URL live n'est renseignée (projet pas encore en ligne).
ALTER TABLE projects
  ADD COLUMN preview_image VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER cover_image;
