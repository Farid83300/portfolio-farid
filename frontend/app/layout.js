import { Rajdhani, Rubik } from 'next/font/google';
import '../public/assets/scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import LayoutWrapper from '@/components/common/LayoutWrapper';
import CookieConsent from '@/components/common/CookieConsent';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';

const rajdhani = Rajdhani({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-rajdhani',
    display: 'optional',
});

const rubik = Rubik({
    subsets: ['latin'],
    variable: '--font-rubik',
    display: 'optional',
});

export const metadata = {
    metadataBase: new URL('https://www.faridzaffalone.com'),
    title: 'Farid Zaffalone | Développeur Freelance PHP/React & WordPress',
    description:
        'Portfolio de Farid Zaffalone, développeur freelance spécialisé dans le développement PHP/React, la conception Figma et les projets WordPress.',
    alternates: {
        canonical: '/',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr" className={`${rajdhani.variable} ${rubik.variable}`}>
            <body>
                <Script src="/assets/js/smooth.js" strategy="afterInteractive" />
                <LayoutWrapper>
                    <ToastContainer
                        position="top-right"
                        // autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    {children}
                </LayoutWrapper>
                <CookieConsent />
            </body>
        </html>
    );
}
