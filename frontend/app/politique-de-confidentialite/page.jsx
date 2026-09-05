import Copyright from '@/components/footers/Copyright';
import Footer3 from '@/components/footers/Footer3';
import Header1 from '@/components/headers/Header1';
import CommonComponents from '@/components/common/CommonComponents';
import Link from 'next/link';

export const metadata = {
    title: 'Politique de confidentialité || Farid Zaffalone',
    description:
        "Politique de confidentialité et de protection des données personnelles du site de Farid Zaffalone.",
};

export default function PolitiqueDeConfidentialite() {
    return (
        <>
            <Header1 />
            <div className="breadcrumb-area breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-inner text-center">
                                <h1 className="title split-collab">Politique de confidentialité</h1>
                                <ul className="page-list">
                                    <li className="tmp-breadcrumb-item">
                                        <Link href={`/`}>Accueil</Link>
                                    </li>
                                    <li className="icon">
                                        <i className="fa-solid fa-angle-right" />
                                    </li>
                                    <li className="tmp-breadcrumb-item active">
                                        Politique de confidentialité
                                    </li>
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
                                    La présente politique de confidentialité décrit comment Farid
                                    Zaffalone collecte, utilise et protège les données personnelles des
                                    visiteurs du site <strong>faridzaffalone.com</strong>, conformément au
                                    Règlement (UE) 2016/679 (RGPD) et à la loi française n° 78-17 du 6
                                    janvier 1978 modifiée relative à l&apos;informatique, aux fichiers et
                                    aux libertés.
                                </p>

                                <h2>1. Responsable du traitement</h2>
                                <p>
                                    Le responsable du traitement des données est :<br />
                                    <strong>Farid Zaffalone</strong>
                                    <br />
                                    8 Rue du Combat, 83300 Draguignan, France
                                    <br />
                                    Téléphone : +33 6 60 91 93 20
                                    <br />
                                    E-mail :{' '}
                                    <a href="mailto:contact@faridzaffalone.com">
                                        contact@faridzaffalone.com
                                    </a>
                                </p>

                                <h2>2. Données collectées et finalités</h2>
                                <p>Le site collecte des données personnelles dans les cas suivants :</p>
                                <ul>
                                    <li>
                                        <strong>Formulaire de contact</strong> : nom, adresse e-mail, objet
                                        et contenu du message. Finalité : répondre à votre demande. Base
                                        légale : intérêt légitime à traiter les demandes qui vous sont
                                        adressées / exécution de mesures précontractuelles à votre demande.
                                    </li>
                                    <li>
                                        <strong>Widget de discussion « Message Direct »</strong> : nom,
                                        adresse e-mail et contenu du message. Finalité et base légale :
                                        identiques au formulaire de contact.
                                    </li>
                                    <li>
                                        <strong>Inscription à la newsletter</strong> : adresse e-mail
                                        uniquement. Finalité : vous tenir informé(e) de l&apos;actualité du
                                        site. Base légale : votre consentement, que vous pouvez retirer à
                                        tout moment.
                                    </li>
                                    <li>
                                        <strong>Cookies de mesure d&apos;audience</strong> : Google Analytics
                                        et Microsoft Clarity, voir le détail à la section 4. Base légale :
                                        votre consentement.
                                    </li>
                                </ul>
                                <p>
                                    Aucune donnée bancaire n&apos;est collectée ou traitée par ce site : il
                                    ne propose ni paiement ni vente en ligne.
                                </p>

                                <h2>3. Destinataires des données</h2>
                                <p>
                                    Les données collectées sont destinées exclusivement à Farid Zaffalone.
                                    Elles peuvent être traitées par les sous-traitants techniques suivants,
                                    dans le cadre strict de l&apos;hébergement et du fonctionnement du site
                                    :
                                </p>
                                <ul>
                                    <li>o2switch (hébergement du serveur et de la base de données, France)</li>
                                    <li>Vercel Inc. (hébergement du site public et de l&apos;espace d&apos;administration, États-Unis)</li>
                                    <li>Google Ireland Ltd (Google Analytics, mesure d&apos;audience)</li>
                                    <li>Microsoft Ireland Operations Ltd (Microsoft Clarity, mesure d&apos;audience)</li>
                                </ul>
                                <p>
                                    Aucune donnée n&apos;est vendue ni cédée à des tiers à des fins
                                    commerciales.
                                </p>

                                <h2>4. Cookies</h2>
                                <p>
                                    Le site dépose les cookies suivants lors de votre navigation :
                                </p>
                                <ul>
                                    <li>
                                        <strong>_ga, _ga_*</strong> — Google Analytics — mesure
                                        d&apos;audience (pages visitées, provenance du trafic) — conservés
                                        jusqu&apos;à 13 mois.
                                    </li>
                                    <li>
                                        <strong>_clck, _clsk</strong> — Microsoft Clarity — analyse du
                                        comportement de navigation (parcours, interactions) — conservés
                                        jusqu&apos;à 1 an.
                                    </li>
                                </ul>
                                <p>
                                    Vous pouvez à tout moment vous opposer au dépôt de ces cookies en
                                    configurant votre navigateur pour refuser les cookies, ou via les
                                    extensions de blocage dédiées (ex. bloqueurs de traceurs). Le refus de
                                    ces cookies n&apos;empêche pas l&apos;accès au site, dont le
                                    fonctionnement n&apos;en dépend pas.
                                </p>

                                <h2>5. Durée de conservation</h2>
                                <ul>
                                    <li>
                                        Messages de contact et messages du widget de discussion : 3 ans à
                                        compter du dernier échange.
                                    </li>
                                    <li>
                                        Adresse e-mail newsletter : jusqu&apos;à votre désinscription (pour
                                        vous désinscrire, contactez-nous par e-mail à l&apos;adresse
                                        ci-dessus).
                                    </li>
                                    <li>Cookies de mesure d&apos;audience : 13 mois maximum.</li>
                                </ul>

                                <h2>6. Sécurité des données</h2>
                                <p>
                                    Le site est servi en HTTPS. Les mots de passe de l&apos;espace
                                    d&apos;administration sont hachés (bcrypt) et l&apos;accès à cet espace
                                    est protégé par une authentification à deux facteurs (2FA). Le contenu
                                    saisi dans l&apos;administration est filtré avant affichage public pour
                                    prévenir toute injection de code malveillant.
                                </p>

                                <h2>7. Transferts de données hors Union européenne</h2>
                                <p>
                                    L&apos;hébergement du site public et de l&apos;espace
                                    d&apos;administration (Vercel) ainsi que les outils de mesure
                                    d&apos;audience (Google Analytics, Microsoft Clarity) peuvent impliquer
                                    un transfert de données vers les États-Unis. Ces prestataires adhèrent
                                    au cadre du Data Privacy Framework UE-États-Unis ou proposent des
                                    clauses contractuelles types de la Commission européenne, garantissant
                                    un niveau de protection adéquat de vos données.
                                </p>

                                <h2>8. Vos droits</h2>
                                <p>
                                    Conformément au RGPD, vous disposez des droits suivants sur vos données
                                    personnelles : droit d&apos;accès, de rectification, d&apos;effacement,
                                    de limitation du traitement, d&apos;opposition et de portabilité. Vous
                                    pouvez également définir des directives relatives au sort de vos
                                    données après votre décès.
                                </p>
                                <p>
                                    Pour exercer ces droits, contactez-nous par e-mail à{' '}
                                    <a href="mailto:contact@faridzaffalone.com">
                                        contact@faridzaffalone.com
                                    </a>{' '}
                                    ou par courrier à l&apos;adresse indiquée en section 1, en justifiant de
                                    votre identité.
                                </p>
                                <p>
                                    Si vous estimez, après nous avoir contactés, que vos droits ne sont pas
                                    respectés, vous pouvez adresser une réclamation à la CNIL (Commission
                                    Nationale de l&apos;Informatique et des Libertés) : 3 Place de
                                    Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou sur{' '}
                                    <a
                                        href="https://www.cnil.fr"
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                    >
                                        www.cnil.fr
                                    </a>
                                    .
                                </p>

                                <h2>9. Modification de la politique de confidentialité</h2>
                                <p>
                                    Cette politique de confidentialité peut être mise à jour à tout moment,
                                    notamment pour se conformer à toute évolution réglementaire,
                                    jurisprudentielle ou technique. La date de dernière mise à jour figure
                                    ci-dessous.
                                </p>
                                <p>
                                    <em>Dernière mise à jour : 5 septembre 2026.</em>
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
