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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
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
