import { getProjects, getServices, getPosts } from "@/lib/publicApi";

export default async function sitemap() {
  const baseUrl = "https://www.faridzaffalone.com";

  const staticRoutes = [
    "",
    "/about",
    "/service",
    "/project",
    "/contact",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const legalRoutes = ["/mentions-legales", "/politique-de-confidentialite"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  const [projects, services, posts] = await Promise.all([
    getProjects(),
    getServices(),
    getPosts(),
  ]);

  const lastMod = (item) => (item.updated_at ? new Date(item.updated_at) : new Date());

  const projectRoutes = projects.map((item) => ({
    url: `${baseUrl}/project-details/${item.slug}`,
    lastModified: lastMod(item),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceRoutes = services.map((item) => ({
    url: `${baseUrl}/service-details/${item.slug}`,
    lastModified: lastMod(item),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes = posts.map((item) => ({
    url: `${baseUrl}/blog-details/${item.slug}`,
    lastModified: lastMod(item),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...legalRoutes, ...projectRoutes, ...serviceRoutes, ...blogRoutes];
}
