const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function uploadUrl(path) {
    if (!path) return null;
    return `${API_URL}/uploads/${path}`;
}

async function publicFetch(path) {
    const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export async function getPosts({ category, tag } = {}) {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (tag) params.set('tag', tag);
    const query = params.toString() ? `?${params.toString()}` : '';

    return (await publicFetch(`/posts${query}`)) || [];
}

export async function getPost(slug) {
    return publicFetch(`/posts/${slug}`);
}

export async function getProjects() {
    return (await publicFetch('/projects')) || [];
}

export async function getProject(slug) {
    return publicFetch(`/projects/${slug}`);
}

export async function getServices() {
    return (await publicFetch('/services')) || [];
}

export async function getService(slug) {
    return publicFetch(`/services/${slug}`);
}

export { API_URL };
