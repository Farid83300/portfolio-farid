import '../public/assets/scss/main.scss';
import 'odometer/themes/odometer-theme-default.css'; // Import theme
import 'react-toastify/dist/ReactToastify.css';
import LayoutWrapper from '@/components/common/LayoutWrapper';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
export const metadata = {
  title: 'Farid Zaffalone | Développeur Freelance PHP/React & WordPress',
  description:
    "Portfolio de Farid Zaffalone, développeur freelance spécialisé dans le développement PHP/React, la conception Figma et les projets WordPress.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J7VRJ4H2H5"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J7VRJ4H2H5');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uetk0l9p9w");
          `}
        </Script>
      </head>

      <body>
        <Script src="/assets/js/smooth.js" strategy="beforeInteractive" />
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
      </body>
    </html>
  );
}
