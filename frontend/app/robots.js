export default function robots() {
    const baseUrl = 'https://www.faridzaffalone.com';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/admin',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
