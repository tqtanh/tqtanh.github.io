// All CV-derived content lives here. Pages read from this file.

export const bio = {
  short:
    'I build software for the web, desktop, mobile and extended reality. I have a PhD in Information Science and more than ten years of experience turning ideas into working systems, from laser tag game servers to VR studies run with retirement village residents.',
  long: [
    'I am a full-stack software engineer at Delta Strike International in Christchurch, New Zealand. I architect, build, test and deploy C#/.NET features across the front end, back end and database, using Blazor, .NET MAUI and SQL, shipped through Docker and Bitbucket Pipelines. I also build real-time device and game management systems for laser tag hardware with Rx.NET and ReactiveUI.',
    'Before industry, I spent most of a decade doing research in Vietnam, South Korea, Canada and New Zealand. My PhD at the University of Otago looked at how we measure presence in mixed reality. Along the way I built VR bike simulators, a Moon and Mars simulator driven by motion capture, and a VR system for the VR Reminiscence Project in Otago\'s Division of Health Sciences, used with residents of retirement villages.',
    'I still publish XR research alongside my day job, most recently at CHI 2025. Engineering comes first for me, research keeps me honest about whether things work for people, and I keep one eye on where all of this is heading.',
  ],
};

export const pillars = [
  {
    index: '01',
    title: 'Engineer',
    body: 'Full-stack C#/.NET with Blazor, .NET MAUI, SQL and Rx.NET. Real-time, event-driven systems, tested and shipped through CI/CD.',
    href: '/projects/',
    cta: 'Projects',
  },
  {
    index: '02',
    title: 'Researcher',
    body: 'PhD in Information Science. Ten publications on presence, locomotion and interaction in VR and mixed reality, including CHI and ACM TOCHI.',
    href: '/research/',
    cta: 'Publications',
  },
  {
    index: '03',
    title: 'Futurist',
    body: 'Extended reality, AI coding agents and emerging tech. Interested in how these tools change the way software gets built and used.',
    href: '/blog/',
    cta: 'Writing',
  },
];

export const highlights = [
  { value: '10+', label: 'Years building software for web, desktop, mobile and XR' },
  { value: '10', label: 'Peer-reviewed papers, including CHI, TOCHI and IEEE TVCG' },
  { value: 'PhD', label: 'Information Science, University of Otago' },
  { value: '4', label: 'Countries of research: Vietnam, South Korea, Canada, New Zealand' },
];

export type Role = {
  org: string;
  title: string;
  location: string;
  period: string;
  kind: 'industry' | 'research' | 'teaching';
  points: string[];
  tags?: string[];
};

export const experience: Role[] = [
  {
    org: 'Delta Strike International Ltd',
    title: 'Software Engineer',
    location: 'Christchurch, New Zealand',
    period: 'Oct 2023 – Present',
    kind: 'industry',
    points: [
      'Architect, build, test and deploy features in C# and .NET Core across the front end, back end and database.',
      'Design and mock up interfaces in Figma, Penpot and Claude Design, then build them as responsive, accessible Blazor components.',
      'Build real-time, event-driven device and game management features with Rx.NET and ReactiveUI, including firmware updates and live diagnostics for laser tag devices.',
      'Improve performance by profiling, refactoring and tuning SQL queries; diagnose and fix complex production faults.',
      'Package services with Docker and run builds, tests and deployments through Bitbucket Pipelines.',
      'Write unit, integration and system tests with xUnit, TUnit, bUnit and Vitest.',
      'Use AI coding agents (Claude Code, Codex, Gemini, GitHub Copilot) to speed up feature work, test generation and large refactors.',
      'Work with support and other teams to resolve technical issues for international customers.',
    ],
    tags: ['C#', '.NET', 'Blazor', '.NET MAUI', 'Rx.NET', 'ReactiveUI', 'SQL', 'Docker', 'CI/CD'],
  },
  {
    org: 'University of Science, VNU-HCM',
    title: 'Visiting Lecturer',
    location: 'Ho Chi Minh City, Vietnam',
    period: 'May 2024 – Aug 2024',
    kind: 'teaching',
    points: [
      'Co-supervised a bachelor\'s thesis, completed with distinction.',
      'Designed user studies, analysed the data and wrote the reports.',
      'Co-authored RedirectedStepper, published at CHI 2025.',
    ],
  },
  {
    org: 'University of Otago',
    title: 'Tutor',
    location: 'Dunedin, New Zealand',
    period: 'Feb 2022 – Dec 2022 · Jul 2023 – Nov 2023',
    kind: 'teaching',
    points: [
      'Taught lab sessions alongside lecturers and teaching fellows, and marked assignments.',
      'Courses: Introduction to Data Science, Practical Data Science, Algorithms and Data Structures, Software Development.',
    ],
  },
  {
    org: 'OSLA.io',
    title: 'Application Architect',
    location: 'Ho Chi Minh City, Vietnam',
    period: 'Jan 2021 – Dec 2022',
    kind: 'industry',
    points: [
      'Gathered requirements and defined feature sets with stakeholders.',
      'Designed database schemas and system architecture.',
      'Wrote technical documentation, including the API specifications developers built from.',
      'Ran system tests and revised the architecture based on QA results and user feedback.',
    ],
    tags: ['Architecture', 'Database design', 'API specs'],
  },
  {
    org: 'University of Otago',
    title: 'Assistant Research Fellow',
    location: 'Dunedin, New Zealand',
    period: 'Jun 2021 – Jan 2022',
    kind: 'research',
    points: [
      'Built a VR system that streams 360-degree video in real time from a PC to an Oculus Quest 2.',
      'Designed structured datasets, metadata workflows and data collection tools for human-subject research.',
      'Implemented core features and logged performance metrics during user studies.',
      'Supported deployment and testing across research teams.',
    ],
    tags: ['Unity', 'VR', 'Oculus Quest 2'],
  },
  {
    org: 'University of Science, VNU-HCM',
    title: 'Research Assistant',
    location: 'Ho Chi Minh City, Vietnam',
    period: 'Sep 2017 – Jan 2019',
    kind: 'research',
    points: [
      'Led development of a hybrid VR bike simulator with electric assist.',
      'Supervised undergraduate thesis students and led empirical user studies.',
      'Published the simulator studies at VRST 2018 and INTERACT 2019.',
    ],
    tags: ['VR', 'Locomotion', 'User studies'],
  },
  {
    org: 'Korea University',
    title: 'Research Assistant',
    location: 'Seoul, South Korea',
    period: 'Sep 2015 – Aug 2017',
    kind: 'research',
    points: [
      'Ported the SDL 2.0 library to Tizen OS.',
      'Implemented OptiTrack motion tracking to animate a rigged avatar in a Moon and Mars VR simulator.',
      'Evaluated simulator performance through user studies; published at VRST 2017 and IEEE VR 2017 (IEEE TVCG).',
    ],
    tags: ['C/C++', 'SDL', 'OptiTrack', 'VR'],
  },
  {
    org: 'York University',
    title: 'Research Assistant (Internship)',
    location: 'Toronto, Canada',
    period: 'May 2014 – Aug 2014',
    kind: 'research',
    points: [],
  },
];

export const education = [
  {
    school: 'University of Otago',
    degree: 'PhD in Information Science',
    location: 'Dunedin, New Zealand',
    period: 'Apr 2019 – May 2024',
    notes: ['University of Otago Doctoral Scholarship', 'Research Assistant and Tutor'],
  },
  {
    school: 'Korea University',
    degree: 'MEng in Computer Science and Engineering',
    location: 'Seoul, South Korea',
    period: 'Sep 2015 – Aug 2017',
    notes: ['GPA 4.33 / 4.50', 'Pony Chung Invitation Scholarship (2015)', 'Research Assistant'],
  },
  {
    school: 'University of Science, VNU-HCM',
    degree: 'BSc (Honours) in Information Technology',
    location: 'Ho Chi Minh City, Vietnam',
    period: 'Aug 2010 – Oct 2014',
    notes: [
      'Graduated with Distinction, ranked 2nd in the Honours Program',
      'GPA 9.21 / 10, Dean\'s List three years running',
      'Third Prize, 22nd Information Technology Competition for Youth',
      'POSCO TJ Park, Nguyen Thai Binh and Pony Chung scholarships',
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['C#', 'C/C++', 'Java', 'Python', 'R', 'TypeScript', 'JavaScript', 'SQL', 'HTML/CSS'] },
  { group: 'Frameworks', items: ['.NET Core', 'Blazor', '.NET MAUI', 'Rx.NET', 'ReactiveUI', 'WPF', 'Node.js', 'Electron', 'Pyodide', 'Babylon.js', 'Tailwind CSS'] },
  { group: 'Databases', items: ['PostgreSQL', 'SQL Server', 'SQLite', 'MongoDB'] },
  { group: 'Engineering', items: ['System architecture', 'Database design', 'API development', 'Performance tuning', 'Unit/integration/system testing', 'Docker', 'CI/CD'] },
  { group: 'Data & research', items: ['Empirical study design', 'Statistics (Python, R, SPSS, SAS)', 'D3.js visualisation', 'Metadata workflows', 'Qualtrics'] },
  { group: 'XR & tools', items: ['Unity', 'OptiTrack Motive', 'HTC Vive Pro Eye', 'Oculus Quest', 'MATLAB', 'Jupyter', 'LaTeX'] },
  { group: 'AI tooling', items: ['Claude Code', 'Codex', 'Gemini', 'GitHub Copilot'] },
];

// Map coordinates for every `location` used by a role or degree. Drives the map on /about/.
export const placeCoords: Record<string, [number, number]> = {
  'Ho Chi Minh City, Vietnam': [10.82, 106.63],
  'Toronto, Canada': [43.77, -79.5],
  'Seoul, South Korea': [37.59, 127.03],
  'Dunedin, New Zealand': [-45.87, 170.5],
  'Christchurch, New Zealand': [-43.53, 172.64],
};

export const interests = [
  { title: 'Photography', body: 'Visual storytelling; practising for over six years.' },
  { title: 'Travelling', body: 'Photographing and documenting the places I visit.' },
  { title: 'Cooking', body: 'Vietnamese dishes such as fresh spring rolls and bánh mì.' },
  { title: 'Reading', body: 'History, geography, emerging tech trends and photography.' },
];

export const spokenLanguages = [
  { name: 'English', level: 'Professional' },
  { name: 'Vietnamese', level: 'Native' },
];

export type Publication = {
  year: number;
  authors: string[];
  title: string;
  venue: string;
  short: string; // short venue label for badges
  type: 'Conference' | 'Journal' | 'Workshop / Adjunct';
  doi?: string;
  url?: string; // non-DOI link, e.g. a preprint
};

export const me = 'Tanh Quang Tran';

export const publications: Publication[] = [
  {
    year: 2025,
    authors: ['Quang-Tri Le', 'Duc-Nham Huynh', 'Tanh Quang Tran', 'Morten Fjeld', 'Wolfgang Stuerzlinger', 'Markus Zank', 'Minh-Triet Tran', 'Khanh-Duy Le'],
    title: 'RedirectedStepper: Exploring Walking-In-Place Locomotion in VR Using a Mini Stepper for Ascents',
    venue: 'ACM Conference on Human Factors in Computing Systems (CHI 2025)',
    short: 'CHI 2025',
    type: 'Conference',
    doi: '10.1145/3706598.3713313',
  },
  {
    year: 2024,
    authors: ['Tanh Quang Tran', 'Tobias Langlotz', 'Jacob Young', 'Thomas W. Schubert', 'Holger Regenbrecht'],
    title: 'Classifying Presence Scores: Insights and Analysis from Two Decades of the Igroup Presence Questionnaire (IPQ)',
    venue: 'ACM Transactions on Computer-Human Interaction',
    short: 'ACM TOCHI',
    type: 'Journal',
    doi: '10.1145/3689046',
  },
  {
    year: 2024,
    authors: ['Tanh Quang Tran', 'Tobias Langlotz', 'Holger Regenbrecht'],
    title: 'A Survey on Measuring Presence in Mixed Reality',
    venue: 'ACM Conference on Human Factors in Computing Systems (CHI 2024)',
    short: 'CHI 2024',
    type: 'Conference',
    doi: '10.1145/3613904.3642383',
  },
  {
    year: 2022,
    authors: ['Tanh Quang Tran'],
    title: 'Toward Methods To Develop Experience Measurements For Mixed Reality',
    venue: 'IEEE International Symposium on Mixed and Augmented Reality Adjunct (ISMAR-Adjunct 2022)',
    short: 'ISMAR-Adjunct 2022',
    type: 'Workshop / Adjunct',
    doi: '10.1109/ISMAR-Adjunct57072.2022.00059',
  },
  {
    year: 2021,
    authors: ['Khanh-Duy Le', 'Tanh Quang Tran', 'Karol Chlasta', 'Krzysztof Krejtz', 'Morten Fjeld', 'Andreas Kunz'],
    title: 'VXSlate: Exploring Combination of Head Movements and Mobile Touch for Large Virtual Display Interaction',
    venue: 'ACM Designing Interactive Systems Conference (DIS 2021)',
    short: 'DIS 2021',
    type: 'Conference',
    doi: '10.1145/3461778.3462076',
  },
  {
    year: 2021,
    authors: ['Khanh-Duy Le', 'Tanh Quang Tran', 'Karol Chlasta', 'Krzysztof Krejtz', 'Morten Fjeld', 'Andreas Kunz'],
    title: 'VXSlate: Combining Head Movement and Mobile Touch for Large Virtual Display Interaction',
    venue: 'IEEE Conference on Virtual Reality and 3D User Interfaces Abstracts and Workshops (VRW 2021)',
    short: 'IEEE VRW 2021',
    type: 'Workshop / Adjunct',
    doi: '10.1109/VRW52623.2021.00146',
  },
  {
    year: 2019,
    authors: ['Tanh Quang Tran', 'Holger Regenbrecht', 'Minh-Triet Tran'],
    title: 'Am I Moving Along a Curve? A Study on Bicycle Traveling-In-Place Techniques in Virtual Environments',
    venue: 'Human-Computer Interaction – INTERACT 2019, Lecture Notes in Computer Science, vol 11749. Springer',
    short: 'INTERACT 2019',
    type: 'Conference',
    doi: '10.1007/978-3-030-29390-1_19',
  },
  {
    year: 2018,
    authors: ['Tanh Quang Tran', 'Thanh Dat Ngoc Tran', 'Tam Duy Nguyen', 'Holger Regenbrecht', 'Minh-Triet Tran'],
    title: 'Can We Perceive Changes in Our Moving Speed? A Comparison Between Directly and Indirectly Powering the Locomotion in Virtual Environments',
    venue: '24th ACM Symposium on Virtual Reality Software and Technology (VRST 2018)',
    short: 'VRST 2018',
    type: 'Conference',
    doi: '10.1145/3281505.3281510',
  },
  {
    year: 2017,
    authors: ['Tanh Quang Tran', 'HyunJu Shin', 'Wolfgang Stuerzlinger', 'JungHyun Han'],
    title: 'Effects of Virtual Arm Representations on Interaction in Virtual Environments',
    venue: '23rd ACM Symposium on Virtual Reality Software and Technology (VRST 2017)',
    short: 'VRST 2017',
    type: 'Conference',
    doi: '10.1145/3139131.3139149',
  },
  {
    year: 2017,
    authors: ['MyoungGon Kim', 'SungIk Cho', 'Tanh Quang Tran', 'Seong-Pil Kim', 'Ohung Kwon', 'JungHyun Han'],
    title: 'Scaled Jump in Gravity-Reduced Virtual Environments',
    venue: 'IEEE Transactions on Visualization and Computer Graphics (presented at IEEE VR 2017)',
    short: 'IEEE VR 2017 · TVCG',
    type: 'Journal',
    doi: '10.1109/TVCG.2017.2657139',
  },
];

export const researchThemes = [
  {
    title: 'Presence in mixed reality',
    body: 'How we measure the feeling of "being there". A survey of presence measures (CHI 2024) and two decades of IPQ data (ACM TOCHI).',
  },
  {
    title: 'Locomotion in VR',
    body: 'Bicycle traveling-in-place, powered vs. assisted motion, and mini-stepper ascents (INTERACT 2019, VRST 2018, CHI 2025).',
  },
  {
    title: 'Interaction & embodiment',
    body: 'Virtual arm representations, head-plus-touch input for large virtual displays, and jumping in reduced gravity.',
  },
];

export type Project = {
  title: string;
  org: string;
  period: string;
  summary: string;
  points: string[];
  tags: string[];
  outcome?: string;
  links?: { label: string; href: string }[];
};

// "360° VR Streaming" → "360-vr-streaming". Used for #anchors on /projects/ and the hero scene links.
export const projectSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const projects: Project[] = [
  {
    title: 'Laser Tag Device & Game Management',
    org: 'Delta Strike International',
    period: '2023 – Present',
    summary: 'Real-time software for running laser tag games and managing the hardware behind them.',
    points: [
      'Event-driven game and device management built with Rx.NET and ReactiveUI.',
      'Firmware updates and live diagnostics for laser tag devices.',
      'Blazor and .NET MAUI front ends on a C#/.NET and SQL back end, shipped with Docker and CI/CD.',
    ],
    tags: ['C#', '.NET', 'Rx.NET', 'ReactiveUI', 'Blazor', '.NET MAUI'],
  },
  {
    title: 'Mixed Reality System',
    org: 'University of Otago',
    period: '2021 – 2024',
    summary: 'A Unity framework for running empirical mixed reality studies, with eye tracking built in.',
    points: [
      'Developed the framework in Unity and C#.',
      'Configured eye-tracking calibration and recording on the HTC Vive Pro Eye.',
      'Recruited participants, ran sessions and analysed results in Python, R and SPSS.',
    ],
    tags: ['Unity', 'C#', 'Eye tracking', 'Python', 'R'],
  },
  {
    title: 'Mixed Reality Presence',
    org: 'University of Otago',
    period: '2021 – 2022',
    summary: 'Tools for collecting and exploring the literature on measuring presence in mixed reality.',
    points: [
      'WPF application for collecting and organising papers.',
      'Interactive web visualisation built with D3.js, Electron and Tailwind CSS.',
    ],
    tags: ['WPF', 'D3.js', 'Electron', 'Tailwind CSS'],
    outcome: 'Published at CHI 2024',
    links: [
      { label: 'Open MR Presence', href: 'https://hci.otago.ac.nz/mrpresence/' },
      { label: 'Paper (CHI 2024)', href: 'https://doi.org/10.1145/3613904.3642383' },
    ],
  },
  {
    title: 'IPQ Cal',
    org: 'University of Otago',
    period: '2019 – 2020',
    summary: 'A desktop calculator and web visualiser for Igroup Presence Questionnaire (IPQ) scores.',
    points: [
      'WPF desktop utility that calculates IPQ scores.',
      'Companion web tool with Electron, Bulma, Pyodide, Python and D3.js.',
    ],
    tags: ['WPF', 'Pyodide', 'Python', 'D3.js'],
    outcome: 'Published in ACM TOCHI',
    links: [
      { label: 'Open IPQ Cal', href: 'https://hci.otago.ac.nz/ipqcal/' },
      { label: 'Paper (ACM TOCHI)', href: 'https://doi.org/10.1145/3689046' },
    ],
  },
  {
    title: '360° VR Streaming',
    org: 'University of Otago · VR Reminiscence Project',
    period: '2021 – 2022',
    summary: 'Real-time 360-degree video streaming from a PC to an Oculus Quest 2, used with retirement village residents.',
    points: [
      'Built the streaming pipeline and VR client.',
      'Designed data collection tools and logged performance metrics during studies.',
    ],
    tags: ['Unity', 'VR', 'Health'],
  },
  {
    title: 'Hybrid VR Bike Simulator',
    org: 'University of Science, VNU-HCM',
    period: '2017 – 2019',
    summary: 'A bicycle simulator with electric assist for studying locomotion in virtual environments.',
    points: ['Led development and the user studies behind two papers.'],
    tags: ['VR', 'Hardware', 'User studies'],
    outcome: 'Published at VRST 2018 and INTERACT 2019',
    links: [
      { label: 'Paper (VRST 2018)', href: 'https://doi.org/10.1145/3281505.3281510' },
      { label: 'Paper (INTERACT 2019)', href: 'https://doi.org/10.1007/978-3-030-29390-1_19' },
    ],
  },
  {
    title: 'Moon & Mars VR Simulator',
    org: 'Korea University',
    period: '2015 – 2017',
    summary: 'Reduced-gravity VR simulator with a motion-captured, rigged avatar.',
    points: ['Implemented OptiTrack motion tracking to drive the avatar.', 'Evaluated the simulator through user studies.'],
    tags: ['OptiTrack', 'VR', 'Motion capture'],
    outcome: 'Published in IEEE TVCG (IEEE VR 2017)',
    links: [
      { label: 'Paper (IEEE TVCG)', href: 'https://doi.org/10.1109/TVCG.2017.2657139' },
    ],
  },
];
