import Copyright from '@/components/footers/Copyright';
import Footer3 from '@/components/footers/Footer3';
import Header1 from '@/components/headers/Header1';
import CommonComponents from '@/components/common/CommonComponents';
import Link from 'next/link';

export const metadata = {
    title: 'Page introuvable || Farid Zaffalone',
    description: "La page que vous recherchez n'existe pas ou plus.",
};

export default function NotFound() {
    return (
        <>
            <Header1 />
            <div
                className="breadcrumb-area breadcrumb-bg"
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-inner text-center">
                                <span
                                    className="title split-collab"
                                    style={{
                                        display: 'block',
                                        fontSize: 'clamp(80px, 18vw, 200px)',
                                        lineHeight: 1,
                                        color: 'var(--color-primary)',
                                        marginBottom: 24,
                                    }}
                                >
                                    404
                                </span>
                                <h1 className="title split-collab" style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>
                                    Page introuvable
                                </h1>
                                <p className="disc" style={{ maxWidth: 520, margin: '16px auto 32px' }}>
                                    Cette page n&apos;existe pas ou a été déplacée. Vérifiez
                                    l&apos;adresse ou repartez de la page d&apos;accueil.
                                </p>
                                <div className="button-area-banner-one" style={{ justifyContent: 'center', display: 'flex' }}>
                                    <Link
                                        className="tmp-btn hover-icon-reverse radius-round"
                                        href="/"
                                    >
                                        <span className="icon-reverse-wrapper">
                                            <span className="btn-text">Retour à l&apos;accueil</span>
                                            <span className="btn-icon">
                                                <i className="fa-sharp fa-regular fa-arrow-right" />
                                            </span>
                                            <span className="btn-icon">
                                                <i className="fa-sharp fa-regular fa-arrow-right" />
                                            </span>
                                        </span>
                                    </Link>
                                </div>
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
