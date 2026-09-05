import Copyright from '@/components/footers/Copyright';
import Footer3 from '@/components/footers/Footer3';
import Header1 from '@/components/headers/Header1';
import CommonComponents from '@/components/common/CommonComponents';
import Link from 'next/link';

export const metadata = {
    title: 'Mentions légales || Farid Zaffalone',
    description: 'Mentions légales du site de Farid Zaffalone, développeur freelance PHP/React & WordPress.',
};

export default function MentionsLegales() {
    return (
        <>
            <Header1 />
            <div className="breadcrumb-area breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-inner text-center">
                                <h1 className="title split-collab">Mentions légales</h1>
                                <ul className="page-list">
                                    <li className="tmp-breadcrumb-item">
                                        <Link href={`/`}>Accueil</Link>
                                    </li>
                                    <li className="icon">
                                        <i className="fa-solid fa-angle-right" />
                                    </li>
                                    <li className="tmp-breadcrumb-item active">Mentions légales</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="blog-classic-area-wrapper tmp-section-gap">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="disc">
                                <p>
                                    Conformément aux dispositions des articles 6-III et 19 de la loi n°
                                    2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie
                                    numérique (LCEN), il est précisé aux utilisateurs du site{' '}
                                    <strong>faridzaffalone.com</strong> l&apos;identité des différents
                                    intervenants dans le cadre de sa réalisation et de son suivi.
                                </p>

                                <h2>1. Éditeur du site</h2>
                                <p>
                                    Le présent site est édité par :<br />
                                    <strong>Farid Zaffalone</strong>, développeur freelance PHP/React &amp;
                                    WordPress
                                    <br />
                                    Statut juridique : Micro-entrepreneur
                                    <br />
                                    SIRET : 499 907 285 00047
                                    <br />
                                    TVA non applicable, art. 293 B du CGI
                                    <br />
                                    Adresse : 8 Rue du Combat, 83300 Draguignan, France
                                    <br />
                                    Téléphone : +33 6 60 91 93 20
                                    <br />
                                    E-mail :{' '}
                                    <a href="mailto:contact@faridzaffalone.com">
                                        contact@faridzaffalone.com
                                    </a>
                                </p>
                                <p>Directeur de la publication : Farid Zaffalone.</p>

                                <h2>2. Hébergement</h2>
                                <p>
                                    Le site est composé de deux parties hébergées séparément :
                                </p>
                                <ul>
                                    <li>
                                        <strong>Frontend (site public et espace d&apos;administration)</strong>{' '}
                                        — hébergé par Vercel Inc., société de droit américain.
                                        <br />
                                        Coordonnées et mentions légales de l&apos;hébergeur :{' '}
                                        <a
                                            href="https://vercel.com/legal"
                                            target="_blank"
                                            rel="noopener noreferrer nofollow"
                                        >
                                            vercel.com/legal
                                        </a>
                                    </li>
                                    <li>
                                        <strong>Backend / API et base de données</strong> — hébergé par
                                        o2switch SAS, Chemin des Pardiaux, 63000 Clermont-Ferrand, France.
                                        <br />
                                        Coordonnées et mentions légales de l&apos;hébergeur :{' '}
                                        <a
                                            href="https://www.o2switch.fr/mentions-legales/"
                                            target="_blank"
                                            rel="noopener noreferrer nofollow"
                                        >
                                            o2switch.fr/mentions-legales
                                        </a>
                                    </li>
                                </ul>

                                <h2>3. Propriété intellectuelle</h2>
                                <p>
                                    L&apos;ensemble des contenus présents sur ce site (textes, images,
                                    graphismes, logo, icônes, mise en page, code source, articles de blog,
                                    présentations de projets) est, sauf mention contraire, la propriété
                                    exclusive de Farid Zaffalone et est protégé par le Code de la propriété
                                    intellectuelle. Toute reproduction, représentation, modification,
                                    publication ou adaptation de tout ou partie des éléments du site, quel
                                    que soit le moyen ou le procédé utilisé, est interdite sans
                                    l&apos;autorisation écrite préalable de l&apos;éditeur.
                                </p>

                                <h2>4. Liens hypertextes</h2>
                                <p>
                                    Le site peut contenir des liens hypertextes vers d&apos;autres sites
                                    (réseaux sociaux, projets clients, etc.). Farid Zaffalone n&apos;exerce
                                    aucun contrôle sur ces sites tiers et décline toute responsabilité
                                    quant à leur contenu.
                                </p>

                                <h2>5. Données personnelles</h2>
                                <p>
                                    Le traitement des données personnelles collectées via ce site (formulaire
                                    de contact, widget de chat, inscription à la newsletter, cookies de
                                    mesure d&apos;audience) est détaillé dans la{' '}
                                    <Link href="/politique-de-confidentialite">
                                        politique de confidentialité
                                    </Link>
                                    .
                                </p>

                                <h2>6. Litiges</h2>
                                <p>
                                    Le présent site et les présentes mentions légales sont soumis au droit
                                    français. En cas de litige et à défaut de résolution amiable, les
                                    tribunaux français seront seuls compétents.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer3 />
            <Copyright /> <CommonComponents />
        </>
    );
}
