// Global site settings. Edit these first.
export const site = {
  name: 'Tanh Quang Tran',
  shortName: 'Tanh Tran',
  role: 'Software Engineer · PhD in Information Science',
  tagline: 'Engineer first, researcher second, futurist third.',
  description:
    'Tanh Quang Tran — full-stack software engineer and XR researcher based in Christchurch, New Zealand.',
  location: 'Christchurch, New Zealand',
  // Your GitHub username. Used for the GitHub profile link.
  githubUsername: 'tqtanh',
  // Set to true to show the GitHub icon (header/footer) and the GitHub link on About.
  showGithub: false,
  // Drop a square photo at public/profile.jpg and it will appear automatically.
  photoPath: '/profile.jpg',
};

export const links = {
  email: 'tanhqt@outlook.com',
  linkedin: 'https://www.linkedin.com/in/tanhtran',
  researchgate: 'https://www.researchgate.net/profile/Tanh-Tran', // TODO: confirm URL
  github: site.showGithub && site.githubUsername ? `https://github.com/${site.githubUsername}` : '',
};

export const nav = [
  { href: '/projects/', label: 'Projects' },
  { href: '/research/', label: 'Research' },
  { href: '/blog/', label: 'Writing' },
  { href: '/about/', label: 'About' },
];
