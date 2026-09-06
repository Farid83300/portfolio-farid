-- Permet à la pastille "Newsletter" du Dashboard de refléter les nouveaux
-- abonnés uniquement, et de se vider dès que la page /admin/newsletter est ouverte.
ALTER TABLE newsletter_subscribers
  ADD COLUMN viewed_at TIMESTAMP NULL DEFAULT NULL AFTER unsubscribed_at;
