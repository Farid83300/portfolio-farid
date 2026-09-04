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
};

export default nextConfig;
