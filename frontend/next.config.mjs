/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        quietDeps: true, // This will silence deprecation warnings
        silenceDeprecations: ['mixed-decls', 'legacy-js-api'],
    },
    images: {
        remotePatterns: [
            { protocol: 'http', hostname: 'localhost', port: '8888', pathname: '/portfolio-farid-backend/**' },
            { protocol: 'http', hostname: 'localhost', port: '8000', pathname: '/uploads/**' },
        ],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                ],
            },
        ];
    },
};

export default nextConfig;
