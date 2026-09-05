'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const CONSENT_KEY = 'ppf-cookie-consent';
const GA_ID = 'G-J7VRJ4H2H5';
const CLARITY_ID = 'uetk0l9p9w';

export default function CookieConsent() {
    const [consent, setConsent] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        try {
            const stored = window.localStorage.getItem(CONSENT_KEY);
            if (stored === 'accepted' || stored === 'refused') {
                setConsent(stored);
            } else {
                setVisible(true);
            }
        } catch {
            setVisible(true);
        }
    }, []);

    function choose(value) {
        try {
            window.localStorage.setItem(CONSENT_KEY, value);
        } catch {
            // localStorage unavailable (private mode, blocked) — consent choice won't persist across reloads
        }
        setConsent(value);
        setVisible(false);
    }

    return (
        <>
            {consent === 'accepted' && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                        strategy="afterInteractive"
                    />
                    <Script id="gtag-init" strategy="afterInteractive">
                        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
                    </Script>
                    <Script id="clarity-init" strategy="afterInteractive">
                        {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `}
                    </Script>
                </>
            )}

            {visible && (
                <div
                    className="cookie-consent-banner"
                    role="dialog"
                    aria-live="polite"
                    aria-label="Consentement aux cookies"
                >
                    <div className="cookie-consent-inner">
                        <p className="cookie-consent-text">
                            Ce site utilise des cookies de mesure d&apos;audience (Google Analytics,
                            Microsoft Clarity) pour comprendre comment il est utilisé. Vous pouvez les
                            accepter ou les refuser. En savoir plus dans notre{' '}
                            <a href="/politique-de-confidentialite">
                                politique de confidentialité
                            </a>
                            .
                        </p>
                        <div className="cookie-consent-actions">
                            <button
                                type="button"
                                className="cookie-btn cookie-btn-accept"
                                onClick={() => choose('accepted')}
                            >
                                Accepter
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="cookie-consent-close"
                        aria-label="Fermer et refuser les cookies non essentiels"
                        onClick={() => choose('refused')}
                    >
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>
            )}
        </>
    );
}
