export const menuItems = [
  { label: 'Acceuil', href: '/', isLink: false },
  { label: 'À Propos', href: '/about', isLink: true },
  {
    label: 'Services',
    href: '#',
    hasDropdown: true,
    submenu: [
      { label: 'Service', href: '/service' },
      { label: 'Service Details', href: '/service-details/success-architects' },
    ],
  },
  {
    label: 'Blog',
    href: '#',
    hasDropdown: true,
    submenu: [
      { label: 'Blog Classic', href: '/blog' },
      {
        label: 'Blog Details',
        href: '/blog-details/lets-bring-your-ideas-to-life-contact-me-and-lets',
      },
    ],
  },
  {
    label: 'Projets',
    href: '#',
    hasDropdown: true,
    submenu: [
      { label: 'Project', href: '/project' },
      {
        label: 'Project Details',
        href: '/project-details/my-portfolio-of-innovation',
      },
    ],
  },
  { label: 'Contact', href: '/contact', isLink: true },
];
