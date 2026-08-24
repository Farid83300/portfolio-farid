import { slugify } from "@/utlis/slugify";

export const portfolioItems = [
  {
    id: 1,
    animationOrder: 1,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-1.jpg",
    width: 1920,
    height: 1572,
    title: "SAAS website design",
    tags: ["Figma", "Figma"],
    categories: ["Design", "Content writing", "Marketing"],
  },
  {
    id: 2,
    animationOrder: 2,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-3.jpg",
    width: 1939,
    height: 1572,
    title: "Workout App design",
    tags: ["Adobe", "Webflow", "Ai"],
    categories: ["Branding", "Content writing", "Marketing"],
  },
  {
    id: 3,
    animationOrder: 3,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-4.jpg",
    width: 1939,
    height: 1572,
    title: "Workout App design",
    tags: ["Figma", "Framer", "Wordpress"],
    categories: ["Branding", "Design", "Marketing"],
  },
  {
    id: 4,
    animationOrder: 4,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-2.jpg",
    width: 1939,
    height: 1572,
    title: "Dashboard design",
    tags: ["Adobe", "Webflow"],
    categories: ["Branding", "Design", "Content writing"],
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});

export const portfolioItems2 = [
  {
    id: 1,
    animationOrder: 1,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-1.jpg",
    width: 1920,
    height: 1572,
    title: "Digital Transformation Advisors",
    description: "Development Coaches",
  },
  {
    id: 2,
    animationOrder: 2,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-2.jpg",
    width: 1939,
    height: 1572,
    title: "My work is driven by the belief that thoughtful",
    description: "Development App",
  },
  {
    id: 3,
    animationOrder: 3,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-3.jpg",
    width: 1939,
    height: 1572,
    title: "In this portfolio, you'll find a curated selection",
    description: "Web Design",
  },
  {
    id: 4,
    animationOrder: 4,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-4.jpg",
    width: 1939,
    height: 1572,
    title: "I've had the privilege of working with various",
    description: "App Development",
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});

export const portfolioItems3 = [
  {
    id: 1,
    imageSrc: "/assets/images/latest-portfolio/tab-image-1.png",
    title: "My Portfolio of Innovation",
    description: "Development",
  },
  {
    id: 2,
    imageSrc: "/assets/images/latest-portfolio/tab-image-2.png",
    title: "A Showcase of My Projects",
    description: "Development",
  },
  {
    id: 3,
    imageSrc: "/assets/images/latest-portfolio/tab-image-3.png",
    title: "Professional Showcase",
    description: "Development",
  },
  {
    id: 4,
    imageSrc: "/assets/images/latest-portfolio/tab-image-4.png",
    title: "My Journey as a Creator",
    description: "Development",
  },
  {
    id: 5,
    imageSrc: "/assets/images/latest-portfolio/tab-image-5.png",
    title: "A Journey Through My Work",
    description: "Development",
  },
  {
    id: 6,
    imageSrc: "/assets/images/latest-portfolio/tab-image-6.png",
    title: "A Portfolio of Art & Dedication",
    description: "Development",
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});

export const portfolioItems4 = [
  {
    id: 1,
    imageSrc: "/assets/images/portfolio/portfolio-01.jpg",
    title: "The services provide design",
    category: "Development",
    likes: 600,
    animationDelay: null,
  },
  {
    id: 2,
    imageSrc: "/assets/images/portfolio/portfolio-02.jpg",
    title: "The services provide design",
    category: "Development",
    likes: 600,
    animationDelay: 200,
  },
  {
    id: 3,
    imageSrc: "/assets/images/portfolio/portfolio-03.jpg",
    title: "The services provide design",
    category: "Development",
    likes: 600,
    animationDelay: null,
  },
  {
    id: 4,
    imageSrc: "/assets/images/portfolio/portfolio-04.jpg",
    title: "The services provide design",
    category: "Development",
    likes: 600,
    animationDelay: 200,
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});

export const portfolioItems5 = [
  {
    id: 1,
    animationOrder: 1,
    imageSrc: "/assets/images/portfolio/01.webp",
    title: "Wedding Hair Style",
    tags: ["Wedding", "Style"],
    buttonText: "View Details",
  },
  {
    id: 2,
    animationOrder: 2,
    imageSrc: "/assets/images/portfolio/02.webp",
    title: "Brand Promoting",
    tags: ["Brand", "Promot", "Model"],
    buttonText: "View Details",
  },
  {
    id: 3,
    animationOrder: 3,
    imageSrc: "/assets/images/portfolio/03.webp",
    title: "Product Marketing",
    tags: ["Shirt", "Brand", "Sell"],
    buttonText: "View Details",
  },
  {
    id: 4,
    animationOrder: 4,
    imageSrc: "/assets/images/portfolio/04.webp",
    title: "Dashboard design 2",
    tags: ["Adobe", "Webflow"],
    buttonText: "View Design",
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});

export const portfolioItems6 = [
  {
    id: 1,
    animationOrder: 1,
    imageSrc: "/assets/images/portfolio/05.webp",
    title: "Wedding Hair Styles",
    tags: ["Wedding", "Style"],
    buttonText: "View Details",
    width: 1134,
    height: 1176,
  },
  {
    id: 2,
    animationOrder: 2,
    imageSrc: "/assets/images/portfolio/06.webp",
    title: "Brand Promotingj",
    tags: ["Brand", "Promot", "Model"],
    buttonText: "View Details",
    width: 1134,
    height: 1176,
  },
  {
    id: 3,
    animationOrder: 3,
    imageSrc: "/assets/images/portfolio/07.webp",
    title: "Product Marketings",
    tags: ["Shirt", "Brand", "Sell"],
    buttonText: "View Details",
    width: 1134,
    height: 1176,
  },
  {
    id: 4,
    animationOrder: 4,
    imageSrc: "/assets/images/portfolio/08.webp",
    title: "Dashboard design 3",
    tags: ["Adobe", "Webflow"],
    buttonText: "View Design",
    width: 1134,
    height: 1176,
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});

export const portfolioItems7 = [
  {
    id: 1,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-1.jpg",
    title: "My Journey as a Creator",
    description: "Development Coaches",
    width: 1920,
    height: 1572,
    marginClass: "",
  },
  {
    id: 2,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-2.jpg",
    title: "My Professional Portfolio",
    description: "Development Coaches",
    width: 1939,
    height: 1572,
    marginClass: "mt--100 mt_sm--0 mt_md--50",
  },
  {
    id: 3,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-3.jpg",
    title: "My Portfolio of Innovation",
    description: "App Development",
    width: 1939,
    height: 1572,
    marginClass: "",
  },
  {
    id: 4,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-4.jpg",
    title: "A Portfolio of Creativity and Passion",
    description: "Business Development",
    width: 1939,
    height: 1572,
    marginClass: "mt--100 mt_sm--0 mt_md--50",
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});

export const portfolioItems8 = [
  {
    id: 1,
    imageSrc: "/assets/images/latest-portfolio/tab-image-1.png",
    title: "My Portfolio of Innovation",
    description: "Development",
    width: 410,
    height: 457,
    categories: ["Design", "Content writing", "Marketing"],
  },
  {
    id: 2,
    imageSrc: "/assets/images/latest-portfolio/tab-image-2.png",
    title: "A Showcase of My Projects",
    description: "Development",
    width: 410,
    height: 457,
    categories: ["Branding", "Content writing", "Marketing"],
  },
  {
    id: 3,
    imageSrc: "/assets/images/latest-portfolio/tab-image-3.png",
    title: "Professional Showcase",
    description: "Development",
    width: 410,
    height: 457,
    categories: ["Branding", "Design", "Marketing"],
  },
  {
    id: 4,
    imageSrc: "/assets/images/latest-portfolio/tab-image-4.png",
    title: "My Journey as a Creator",
    description: "Development",
    width: 410,
    height: 457,
    categories: ["Branding", "Design", "Content writing"],
  },
  {
    id: 5,
    imageSrc: "/assets/images/latest-portfolio/tab-image-5.png",
    title: "A Journey Through My Work",
    description: "Development",
    width: 410,
    height: 457,
    categories: ["Branding", "Design", "Content writing", "Marketing"],
  },
  {
    id: 6,
    imageSrc: "/assets/images/latest-portfolio/tab-image-6.png",
    title: "A Portfolio of Art & Dedication",
    description: "Development",
    width: 410,
    height: 457,
    categories: ["Branding", "Design", "Content writing", "Marketing"],
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});

export const portfolioItems9 = [
  {
    id: 1,
    animationOrder: 1,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-5.jpg",
    title: "SAAS website designt",
    tags: ["Figma", "Framer"],
    buttonText: "View Design",
    width: 550,
    height: 396,
  },
  {
    id: 2,
    animationOrder: 2,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-6.jpg",
    title: "Workout App designj",
    tags: ["Adobe", "Webflow", "Ai"],
    buttonText: "View Design",
    width: 550,
    height: 396,
  },
  {
    id: 3,
    animationOrder: 3,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-7.jpg",
    title: "e-Commerce designe",
    tags: ["Figma", "Framer", "Wordpress"],
    buttonText: "View Design",
    width: 550,
    height: 396,
  },
  {
    id: 4,
    animationOrder: 4,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-8.jpg",
    title: "Dashboard design mode",
    tags: ["Adobe", "Webflow"],
    buttonText: "View Design",
    width: 550,
    height: 396,
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});

export const portfolioItems10 = [
  {
    id: 1, // Unique ID for the key prop
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-5.jpg",
    imageAlt: "Blog Thumbnail", // Use descriptive alt text
    title: "SAAS website designn",
    tags: ["Figma", "Framer"],
    animationOrder: 1,
  },
  {
    id: 2,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-6.jpg",
    imageAlt: "Blog Thumbnail",
    title: "Workout App designn",
    tags: ["Adobe", "Webflow", "Ai"],
    animationOrder: 2,
  },
  {
    id: 3,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-7.jpg",
    imageAlt: "Blog Thumbnail",
    title: "e-Commerce designn",
    tags: ["Figma", "Framer", "Wordpress"],
    animationOrder: 3,
  },
  {
    id: 4,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-8.jpg",
    imageAlt: "Blog Thumbnail",
    title: "Dashboard design lol",
    tags: ["Adobe", "Webflow"],
    animationOrder: 4,
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});

export const portfolioItems11 = [
  {
    id: 1,
    imageSrc: "/assets/images/latest-portfolio/tab-image-1.png",
    title: "My Portfolio of Innovation", // Used for title link text and alt
    description: "Development", // Used for the <p> tag
    width: 410, // Static, but included in data - could remove if always same
    height: 457, // Static, but included in data - could remove if always same
    categories: ["Design", "Content writing", "Marketing"],
  },
  {
    id: 2,
    imageSrc: "/assets/images/latest-portfolio/tab-image-2.png",
    title: "A Showcase of My Projects",
    description: "Development",
    width: 410,
    height: 457,
    categories: ["Branding", "Content writing", "Marketing"],
  },
  {
    id: 3,
    imageSrc: "/assets/images/latest-portfolio/tab-image-3.png",
    title: "Professional Showcase",
    description: "Development",
    width: 410,
    height: 457,
    categories: ["Branding", "Design", "Marketing"],
  },
  {
    id: 4,
    imageSrc: "/assets/images/latest-portfolio/tab-image-4.png",
    title: "My Journey as a Creator",
    description: "Development",
    width: 410,
    height: 457,
    categories: ["Branding", "Design", "Content writing"],
  },
  {
    id: 5,
    imageSrc: "/assets/images/latest-portfolio/tab-image-5.png",
    title: "A Journey Through My Work",
    description: "Development",
    width: 410,
    height: 457,
    categories: ["Branding", "Design", "Content writing", "Marketing"],
  },
  {
    id: 6,
    imageSrc: "/assets/images/latest-portfolio/tab-image-6.png",
    title: "A Portfolio of Art & Dedication",
    description: "Development",
    width: 410,
    height: 457,
    categories: ["Branding", "Design", "Content writing", "Marketing"],
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});
export const portfolioItems12 = [
  {
    id: 1,
    imageSrc: "/assets/images/latest-portfolio/tab-image-4.png", // Correcting src based on the new JSX example
    title: "My Portfolio of Innovation", // Using this for H3 link text and alt
    description: "Development", // Using this for P tag text
    width: 410,
    height: 457,
  },
  {
    id: 2,
    imageSrc: "/assets/images/latest-portfolio/tab-image-5.png", // Correcting src
    title: "A Showcase of My Projects",
    description: "Development",
    width: 410,
    height: 457,
  },
  {
    id: 3,
    imageSrc: "/assets/images/latest-portfolio/tab-image-6.png", // Correcting src
    title: "Professional Showcase",
    description: "Development",
    width: 410,
    height: 457,
  },
  {
    id: 4,
    imageSrc: "/assets/images/latest-portfolio/tab-image-7.png", // Correcting src based on the new JSX example
    title: "My Journey as a Creator",
    description: "Development",
    width: 410,
    height: 457,
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});

export const allPortfolioItems = [
  ...portfolioItems,
  ...portfolioItems2,
  ...portfolioItems3,
  ...portfolioItems4,
  ...portfolioItems5,
  ...portfolioItems6,
  ...portfolioItems7,
  ...portfolioItems8,
  ...portfolioItems9,
  ...portfolioItems10,
  ...portfolioItems11,
  ...portfolioItems12,
];
