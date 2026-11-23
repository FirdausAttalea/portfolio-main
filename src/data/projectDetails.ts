export interface ProjectFact {
  label: string;
  value: string;
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectStep {
  title: string;
  description: string;
}

export interface ProjectPersona {
  name: string;
  detail: string;
  goal: string;
  painPoints: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  tagline: string;
  image: string;
  tags: string[];
  facts: ProjectFact[];
  overview: string[];
  problem: string[];
  problemPoints?: string[];
  research?: string[];
  researchStats?: ProjectStat[];
  personas?: ProjectPersona[];
  solution: string[];
  features?: ProjectFeature[];
  role: string[];
  process?: ProjectStep[];
  deliverables?: string[];
  designSystem?: {
    typeface?: string;
    colors?: string[];
    notes?: string[];
  };
  accessibility: string[];
  outcome?: string;
  recognition?: string;
  vision: string[];
  tools?: { name: string; src: string }[];
}

export const projectDetails: ProjectDetail[] = [
  {
    id: 'appnea',
    title: 'Appnea',
    tagline: 'Breathe Better, Sleep Smarter.',
    image: '/img/banner/appnea-banner.png',
    tags: ['Health Tech', 'AI', 'Mobile App', 'UX Research'],
    facts: [
      { label: 'Project type', value: 'National Competition (FindIT, Universitas Gadjah Mada)' },
      { label: 'Created', value: 'May 2025' },
      { label: 'Duration', value: '2 months' },
      { label: 'Role', value: 'Product Manager, UI/UX Designer' },
      { label: 'SDG alignment', value: 'SDG 3, Good Health and Well-being' },
    ],
    overview: [
      'Sleep apnea is a serious sleep disorder that affects sleep quality and increases the risk of long-term health problems, yet many people remain unaware of their condition due to limited awareness and early detection access.',
      'Appnea is an AI-powered sleep monitoring application that analyzes breathing sounds and patterns through a smartphone to help users identify potential sleep apnea risks. It offers an affordable, practical, and accessible solution without requiring additional medical devices.',
    ],
    problem: [
      'Sleep apnea is often a silent threat because many people experience symptoms without realizing the impact on their health. Fatigue, difficulty concentrating, and increased health risks can occur simply because sleep quality is disrupted.',
      'Through research and interviews with sleep apnea patients, individuals with related symptoms, and healthcare professionals, early detection was identified as the main challenge.',
      'Existing monitoring approaches each carry a trade-off that keeps early detection out of reach for many people:',
    ],
    problemPoints: [
      'Polysomnography (PSG) is accurate but expensive and impractical.',
      'CPAP machines are effective but uncomfortable for many people.',
      'General sleep trackers do not focus on detecting sleep apnea.',
    ],
    research: [
      'Many users struggle to recognize symptoms, find existing monitoring methods uncomfortable and expensive, and lack access to a simple solution that helps them understand their sleep condition.',
      'Appnea was developed with an empathetic approach, focusing not only on sleep apnea as a medical issue but also on how it affects daily activities, productivity, and quality of life.',
    ],
    solution: [
      'Provide an easy-to-use platform that helps users detect potential sleep apnea risks, increase awareness of the importance of sleep quality, and support early prevention of sleep-related health issues.',
      'Through AI-based analysis and personalized sleep insights, Appnea aims to reduce undiagnosed sleep apnea cases while creating a more inclusive and accessible approach to maintaining long-term health.',
      'The app delivers a non-invasive, intuitive way to monitor sleep and become aware of potential risks.',
    ],
    features: [
      {
        title: 'Home dashboard',
        description: 'A sleep duration summary that gives users a clear picture of last night at a glance.',
      },
      {
        title: 'Heart rate detail',
        description: 'Daily, weekly, and monthly tabs with a heart rate chart for pattern tracking.',
      },
      {
        title: 'Appnea AI',
        description: 'A dedicated entry point to run the AI-based sleep analysis.',
      },
      {
        title: 'Doctor prompt',
        description: 'A "Butuh Bantuan Dokter?" prompt that connects concerning results to professional help.',
      },
      {
        title: 'Add-data flow',
        description: 'A guided flow for adding sleep data so monitoring stays consistent.',
      },
    ],
    role: [
      'As Product Manager and UI/UX Designer, I framed the problem, planned the product scope, and designed the end-to-end experience.',
      'I led user research and interviews, translated findings into an information architecture and user flows, and produced wireframes and high-fidelity mobile screens.',
      'I also built the component library and design system that kept the interface consistent across the case study.',
    ],
    deliverables: [
      'Customer journey map across four stages: Access, Choose, Share, Reserve',
      'User persona',
      'Empathy map covering says, thinks, feels, does, pains, and gains',
      'Information architecture and sitemap',
      'Low-fidelity wireframes',
      'Component library with navigation bars, buttons, chips, selectors, score rings, and mood scales',
      'High-fidelity mobile screens',
    ],
    designSystem: {
      typeface: 'Plus Jakarta Sans',
      colors: ['Purple primary scale, blue-50 to blue-900', 'Purple gradient accents', 'Clean white surfaces'],
      notes: [
        'Brand mark: moon icon with cloud and purple gradient.',
        'Score rings display sleep scores such as 85.',
        'Emoji mood scale supports quick, low-effort check-ins.',
      ],
    },
    accessibility: [
      'Appnea is designed to make sleep health monitoring accessible to a wider range of users by focusing on simplicity, comfort, and usability.',
      'Users monitor sleep through smartphone-based sound and breathing analysis, without additional medical equipment.',
      'The interface uses clear information, easy navigation, and understandable insights so users can recognize sleep patterns without medical expertise.',
      'The moon represents nighttime, rest, and the natural sleep cycle, while the purple tone reflects calmness, relaxation, health, and innovation.',
    ],
    outcome: '3rd Place, UX Competition FindIT UGM 2025',
    recognition: 'National Competition, Universitas Gadjah Mada',
    vision: [
      'Appnea envisions a future where people can take control of their sleep health through accessible and innovative technology.',
      'By combining artificial intelligence, sleep monitoring, and user-centered design, Appnea aims to encourage early awareness, support healthier sleep habits, and promote preventive healthcare.',
      'Through Appnea, the hope is to reduce undiagnosed sleep apnea cases and encourage healthier lifestyles. Beyond a technology product, it represents a movement toward more inclusive healthcare, where everyone can understand their body, improve sleep quality, and achieve better well-being.',
    ],
    tools: [
      { name: 'Figma', src: '/img/tools/figma-logo.png' },
      { name: 'FigJam', src: '/img/tools/figjam-logo.png' },
    ],
  },
  {
    id: 'liboorin',
    title: 'LiboorIn',
    tagline: 'Enhance the safety of your travel experience',
    image: '/img/banner/liboorin-banner.png',
    tags: ['Travel', 'Tourism', 'Mobile App', 'User Research'],
    facts: [
      { label: 'Project type', value: 'National Competition' },
      { label: 'Created', value: 'Aug 2024' },
      { label: 'Duration', value: '1 month' },
      { label: 'Role', value: 'Product Manager' },
      { label: 'Recognition', value: '1st Place, UI/UX Competition ITFEST Micro IPB' },
    ],
    overview: [
      'LiboorIn is a travel platform designed to help travelers discover and experience local destinations in Indonesia more easily.',
      'Based on user research and interviews, the team found that many travelers face unclear pricing, limited information, difficult access, and a lack of trusted guidance when exploring local destinations.',
      'LiboorIn combines destination recommendations, local tour guide services, and ticket booking to create a more convenient, authentic, and transparent travel experience while supporting local tourism growth.',
    ],
    problem: [
      'Indonesia has a rich diversity of natural landscapes and local cultures, but travelers struggle to explore it with confidence.',
      'Interviews with local tourists, international travelers, destination managers, and tourism stakeholders revealed unclear pricing, limited destination information, difficult access, safety concerns, and overtourism that reduces the authenticity of local experiences.',
      'Local businesses face their own pressure: competition from larger platforms, complicated regulations, and difficulty promoting their services.',
      'LiboorIn was created to connect travelers with authentic local experiences while supporting local communities, balancing traveler needs with local tourism challenges.',
    ],
    research: [
      'The team ran surveys and stakeholder interviews across government, industry, and tourists, then benchmarked Agoda, Pinterest, and Trivago on interface, experience, search and filtering, booking process, reviews, personalization, aesthetics, and user feedback.',
    ],
    researchStats: [
      { value: '73%', label: 'choose the more affordable price' },
      { value: '60%', label: 'receive recommendations from relatives' },
      { value: '40%', label: 'frequently visit tourist destinations' },
      { value: '60%', label: 'revisit tourist destinations' },
      { value: '80%', label: 'prioritize safety and security' },
      { value: '46%', label: 'are satisfied with cleanliness' },
    ],
    personas: [
      {
        name: 'Wayan Pambudi, 45',
        detail: 'Homestay owner in Ubud, Bali',
        goal: 'Sustain and grow his family homestay business while preserving local culture and community quality of life.',
        painPoints: 'Competition from large hotels and online platforms, environmental degradation from over-tourism, and difficulty hiring staff.',
      },
      {
        name: 'Hanny Ozora, 30',
        detail: 'Tourist from Taiwan',
        goal: 'Experience Indonesian culture and nature authentically, away from tourist crowds.',
        painPoints: 'Overcrowded destinations, safety and cleanliness concerns, lack of accurate information, and language barriers.',
      },
    ],
    solution: [
      'Simplify the travel planning process by providing reliable information, transparent pricing, and accessible services in one platform.',
      'Personalized recommendations and local community involvement improve the quality of travel experiences, reduce the impact of overtourism, and support sustainable tourism by helping travelers make informed and responsible choices.',
    ],
    features: [
      {
        title: 'Destination recommendations',
        description: 'Curated local destinations with reliable information beyond overcrowded tourist areas.',
      },
      {
        title: 'Local tour guide services',
        description: 'Certified local guides that give travelers trusted, authentic guidance.',
      },
      {
        title: 'Ticket booking',
        description: 'Transparent pricing and direct booking for destinations and guides in one place.',
      },
    ],
    role: [
      'As Product Manager, I led problem discovery, user research, and the product definition for the platform.',
      'I coordinated the design thinking process from research through testing, and worked with the team to shape the MVP, personas, roadmap, and product metrics.',
    ],
    process: [
      { title: 'Empathize', description: 'User research, interviews and surveys, competitor analysis.' },
      { title: 'Define', description: 'User personas, empathy map, value proposition canvas, product roadmap.' },
      { title: 'Ideate', description: 'Information architecture, user flow, wireframes.' },
      { title: 'Design', description: 'MVP product design.' },
      { title: 'Test', description: 'Product metrics validation.' },
    ],
    deliverables: [
      'Splash and onboarding',
      'Login and register',
      'Home with destination recommendations and search',
      'Profile and edit personal info',
      'Bookings with destination and tour guide tabs',
      'Saved wishlist',
      'Tour guide search and listing',
      'Booking Wisata flow',
      'Notifications',
    ],
    designSystem: {
      typeface: 'Nunito Sans (Regular, Medium, Semi-Bold, Bold, ExtraBold)',
      colors: ['#0059C8', '#D8E9F9', '#FFFFFF', '#E4E7EC', '#1D1F23', '#40444D', '#D0D5DD', '#7A7F89'],
      notes: ['A modern blue palette with clean typography represents trust, exploration, professionalism, and freedom.'],
    },
    accessibility: [
      'LiboorIn is designed for accessible, transparent, and user-friendly travel planning.',
      'Integrated destination recommendations, local guide services, and ticket booking reduce uncertainty.',
      'The approach focuses on simplicity, trust, and comfort through clear information, transparent pricing, and reliable recommendations.',
    ],
    outcome: '1st Place, UI/UX Competition ITFEST Micro IPB',
    recognition: 'National Competition',
    vision: [
      'LiboorIn envisions a future where every traveler can explore Indonesia in a more meaningful, sustainable, and responsible way.',
      'By connecting travelers with local communities and authentic cultural experiences, it aims to balance tourism development, environmental preservation, and local economic empowerment.',
      'The platform encourages travelers to discover hidden destinations while maintaining comfort, safety, and respect for local values, acting as a bridge between travelers and local communities.',
    ],
    tools: [
      { name: 'Figma', src: '/img/tools/figma-logo.png' },
      { name: 'FigJam', src: '/img/tools/figjam-logo.png' },
    ],
  },
  {
    id: 'ecowardrobe',
    title: 'EcoWardrobe',
    tagline: 'Build a better environment',
    image: '/img/banner/ecowardrobe-banner.png',
    tags: ['Sustainability', 'Circular Fashion', 'Mobile App', 'SDG 12'],
    facts: [
      { label: 'Project type', value: 'National Competition' },
      { label: 'Created', value: 'Sep 2024' },
      { label: 'Duration', value: 'Less than 1 month' },
      { label: 'Role', value: 'Product Manager, UI/UX Designer' },
      { label: 'SDG alignment', value: 'SDG 12, Responsible Consumption and Production' },
    ],
    overview: [
      'EcoWardrobe is a sustainable fashion platform designed to help people reduce fast fashion waste by extending the lifecycle of clothing.',
      'The rapid growth of the fashion industry has created significant environmental impact through excessive production, textile waste, and unsustainable consumption habits.',
      'Based on research, many people still own unused clothes but lack accessible solutions to reuse or redistribute them. EcoWardrobe lets users sell, buy, and donate wearable clothing while encouraging more responsible fashion consumption.',
    ],
    problem: [
      'Through research, surveys, and interviews with young fashion consumers, the team found that many people frequently buy new clothes to follow trends but often leave unused clothing stored or thrown away.',
      'Users wanted to reduce their environmental impact but lacked an accessible platform to reuse, sell, donate, or exchange clothes.',
      'EcoWardrobe was developed to transform unused clothing into valuable resources through a circular fashion ecosystem.',
    ],
    solution: [
      'Provide an accessible solution for extending the lifespan of clothing through selling, purchasing, and donating second-hand items.',
      'Through a convenient platform and personalized shopping experience, help users make sustainable choices while reducing the environmental impact of fast fashion.',
      'Build awareness, change consumer behavior, and create a collaborative community for a more sustainable fashion industry.',
    ],
    features: [
      { title: 'EcoMarket', description: 'Sell and buy unused clothes in a curated marketplace.' },
      { title: 'EcoDonate', description: 'Support communities through verified clothing donations.' },
      { title: 'EcoScan', description: 'AI-based personalized style recommendations using skin tone, face shape, and style analysis.' },
      { title: 'EcoLearn', description: 'Sustainability education that encourages mindful consumption.' },
    ],
    role: [
      'As Product Manager and UI/UX Designer, I shaped the circular fashion concept, defined the feature set, and designed the mobile experience and design system.',
      'I grounded the product in consumer research and made accessibility part of the visual direction, including a verified WCAG AAA contrast check.',
    ],
    deliverables: [
      'Home with search, categories, and EcoMarket recommendations',
      'Scan screen for AI personalization',
      'Product detail screen, for example a green sweater at Rp40.000',
      'Login',
      'Donation campaigns',
    ],
    designSystem: {
      typeface: 'Montserrat (headline, title, and body scales)',
      colors: ['#6B240C (primary dark brown)', 'Lighter orange-brown tones', 'Cream accents'],
      notes: [
        'Contrast check of 10.7, passing WCAG AAA for normal and large text.',
        'Components: bottom navigation (Beranda, Donasi, Scan, Riwayat, Profil), product cards, promotional banners, buttons in multiple sizes, donation cards.',
        'Iconography: shirt icon with donation box; icon set includes Bintang, Baju, and Kotak Donasi.',
      ],
    },
    accessibility: [
      'EcoWardrobe makes sustainable fashion accessible and convenient through a simple platform for buying, selling, and donating second-hand clothing.',
      'The experience focuses on clear navigation, personalized recommendations, and features that support responsible fashion choices.',
      'The design prioritizes simplicity, inclusivity, and engagement for users from different backgrounds, backed by an accessibility contrast check of 10.7 that passes WCAG AAA.',
    ],
    outcome: '2nd Runner Up, UI/UX Competition The Ace, Universitas Diponegoro 2024',
    recognition: 'National Competition',
    vision: [
      'EcoWardrobe envisions a future where fashion consumption becomes more responsible, sustainable, and environmentally conscious.',
      'By connecting people through a circular fashion ecosystem, it aims to reduce clothing waste, encourage mindful consumption, and empower communities to protect the environment.',
      'Beyond a marketplace, EcoWardrobe is a community-driven movement supporting circular fashion and contributing to SDG 12.',
    ],
    tools: [
      { name: 'Figma', src: '/img/tools/figma-logo.png' },
      { name: 'FigJam', src: '/img/tools/figjam-logo.png' },
    ],
  },
  {
    id: 'incareer',
    title: 'InCareer',
    tagline: 'Choose, apply, and wait',
    image: '/img/banner/incareer-banner.png',
    tags: ['Inclusive Employment', 'Accessibility', 'Android', 'Mobile Design'],
    facts: [
      { label: 'Project type', value: 'Self Project' },
      { label: 'Created', value: 'Apr 2024' },
      { label: 'Duration', value: 'Less than 1 month' },
      { label: 'Role', value: 'Product Manager' },
      { label: 'Platform', value: 'Android' },
    ],
    overview: [
      'InCareer is a platform designed to help people with physical disabilities find job opportunities that match their skills and abilities through a simple and accessible process: choose, apply, and wait.',
      'Based on research, many people with disabilities still face challenges entering the workforce because companies often have difficulty identifying their potential and suitable roles, so many workers with disabilities end up in informal jobs that do not fully represent their capabilities.',
      'InCareer connects job seekers with inclusive companies through skill-based recommendations, streamlined applications, and a platform that highlights each user\'s strengths.',
    ],
    problem: [
      'People with disabilities often face barriers entering the workforce, not because of a lack of ability, but because their skills and potential are not always recognized by companies.',
      'Research found that many job seekers with disabilities struggle to find matching opportunities, while companies struggle to identify suitable candidates.',
      'InCareer was developed to connect people with disabilities and inclusive companies, focusing on skills, qualifications, and accessibility, and simplifying the job search into three steps: choose, apply, and wait.',
    ],
    solution: [
      'Simplify the employment process for people with physical disabilities by providing personalized job recommendations, accessible job applications, and tools to showcase skills and experiences.',
      'Features include job category matching, company information, application tracking, and disability-friendly recruitment support, empowering users and helping companies discover qualified talent.',
    ],
    features: [
      { title: 'Dashboard', description: 'A real-time online job application process.' },
      { title: 'Recommendations', description: 'Job recommendations based on previous jobs and experience that match user criteria.' },
      { title: 'Categories', description: 'Job categories based on profile qualifications: General Work, Creative and Design, Engineering and Manufacturing, Marketing and Sales, Information Technology, Media and Communication.' },
      { title: 'Application flow', description: 'Application form with CV upload, success confirmation, application tracking, and profile management.' },
    ],
    role: [
      'As Product Manager, I defined the inclusive employment concept, translated research into the three-step job search flow, and specified the core features and user flow.',
      'I shaped the brand direction and design system, including the logo meaning and color palette.',
    ],
    process: [
      { title: 'Onboarding', description: 'Introduce the inclusive employment mission and set expectations.' },
      { title: 'Account type', description: 'Choose between finding a job or finding an employee.' },
      { title: 'Job fields', description: 'Select job fields that match the user\'s qualifications.' },
      { title: 'Sign in', description: 'Email, Google, or Facebook authentication.' },
      { title: 'Apply', description: 'Job application form with CV upload and confirmation.' },
    ],
    deliverables: [
      'Onboarding and account type selection',
      'Job field selection',
      'Sign in with email, Google, or Facebook',
      'Dashboard with live application tracking',
      'Job recommendations and categories',
      'Application form with CV upload and success confirmation',
      'Profile management',
    ],
    designSystem: {
      typeface: 'Montserrat (Medium for logotype, Regular for body)',
      colors: ['#0053F5 (Blue)', '#00359E (Dark Powder Blue)', '#82AAE3 (Cyan-Blue)'],
      notes: [
        'Logo meaning: the tie represents employees and workers, the letter D represents Diversity, and the letter I represents inclusivity and information.',
      ],
    },
    accessibility: [
      'InCareer is designed for an inclusive and accessible job-search experience for people with physical disabilities.',
      'It reduces complexity through personalized job recommendations, clear company information, and a simple application process.',
      'The design prioritizes usability, readability, and accessibility so users can navigate job categories, manage profiles, and track applications.',
      'It is built for Android devices to reach a wider range of users with different device capabilities.',
    ],
    vision: [
      'InCareer envisions an inclusive employment ecosystem where people with disabilities have equal opportunities to showcase their abilities and build meaningful careers.',
      'By creating a bridge between companies and talented individuals with disabilities, InCareer aims to change the perception of disability in the workplace from limitation into potential.',
      'The hope is a future where disability is no longer seen as a barrier to professional growth, while companies recognize the value of an inclusive workforce.',
    ],
    tools: [{ name: 'Figma', src: '/img/tools/figma-logo.png' }],
  },
  {
    id: 'parago',
    title: 'ParaGo',
    tagline: 'Building Paragonian Internal Transportation Booking Systems',
    image: '/img/banner/appnea-banner.png',
    tags: ['Web Design', 'Enterprise', 'Dashboard'],
    facts: [
      { label: 'Project type', value: 'Web Design' },
      { label: 'Role', value: 'Product Designer' },
      { label: 'Rating', value: '5 stars on portfolio slide' },
      { label: 'Duration', value: 'Less than 1 month' },
    ],
    overview: [
      'ParaGo is an internal enterprise web application for managers, built around Paragonian internal transportation booking.',
      'The design centers on a manager dashboard with system performance monitoring across active units and regions.',
    ],
    problem: [
      'Managers need one clear view of fleet utilization, units requiring review, maintenance risk, and approvals across regions instead of scattered operational data.',
    ],
    solution: [
      'The dashboard surfaces fleet utilization, items requiring review, maintenance alerts, regional hotspots, pending and recent approvals, usage analytics, and report generation.',
    ],
    role: ['Designed the manager-facing dashboard and reporting experience for the internal transportation system.'],
    deliverables: [
      'Manager dashboard with system performance monitoring',
      'Regional hotspots map',
      'Pending and recent approvals',
      'Usage analytics, export data, and report generation',
    ],
    accessibility: ['Designed as an internal enterprise web application for managers operating the transportation booking system.'],
    vision: ['A clearer operational picture for managers running internal transportation across active units and regions.'],
    tools: [{ name: 'Figma', src: '/img/tools/figma-logo.png' }],
  },
  {
    id: 'safespeak',
    title: 'SafeSpeak',
    tagline: 'Peduli, Lindungi, Beri Solusi',
    image: '/img/banner/incareer-banner.png',
    tags: ['Mobile Design', 'Safety', 'Community'],
    facts: [
      { label: 'Project type', value: 'Mobile Design' },
      { label: 'Role', value: 'Product Designer' },
      { label: 'Rating', value: '5 stars on portfolio slide' },
      { label: 'Duration', value: 'Less than 1 month' },
    ],
    overview: [
      'SafeSpeak is a mobile design that builds a safe environment for users to recognize and access emergency support.',
      'The tagline is "Peduli, Lindungi, Beri Solusi": care, protect, provide solutions.',
    ],
    problem: [
      'Users need a safe, guided way to recognize their situation and reach the right support without navigating fragmented emergency resources.',
    ],
    solution: [
      'SafeSpeak combines guided self-assessment, a support network, community content, and quick-access emergency support.',
    ],
    features: [
      { title: 'SafeCheck', description: 'Assessment and diagnosis with a risk score.' },
      { title: 'SafeNet', description: 'A support network for users who need help.' },
      { title: 'Community and articles', description: 'Shared experiences and educational content.' },
      { title: 'Emergency support', description: 'Quick access to emergency help.' },
    ],
    role: ['Designed the mobile experience covering self-assessment, support, community, and emergency access.'],
    accessibility: [
      'Quick-access emergency support and a guided risk score make help easier to reach in moments of stress.',
    ],
    vision: ['A safe environment where users can recognize their situation and reach support quickly.'],
    tools: [{ name: 'Figma', src: '/img/tools/figma-logo.png' }],
  },
  {
    id: 'futre',
    title: 'Futre',
    tagline: 'Leveraging technology and 3D USG to predict a mother\'s pregnancy',
    image: '/img/banner/liboorin-banner.png',
    tags: ['Mobile Design', 'Health', 'AI'],
    facts: [
      { label: 'Project type', value: 'Mobile Design' },
      { label: 'Role', value: 'Product Designer' },
      { label: 'Rating', value: '5 stars on portfolio slide' },
      { label: 'Duration', value: 'Less than 1 month' },
    ],
    overview: [
      'Futre is a mobile design that leverages technology and 3D USG to predict a mother\'s pregnancy.',
      'The experience uses a pink and purple visual identity.',
    ],
    problem: [
      'New mothers need accessible, trustworthy pregnancy guidance and educational content in one approachable mobile experience.',
    ],
    solution: [
      'Futre combines social login, a doctor-style guide character, article search, and pregnancy-related educational content.',
    ],
    features: [
      { title: 'Social login', description: 'Apple, Google, and Facebook sign-in.' },
      { title: 'Guide character', description: 'A doctor-style guide that walks mothers through the app.' },
      { title: 'Article search', description: 'Searchable pregnancy-related educational content.' },
    ],
    role: ['Designed the mobile experience and visual identity for the pregnancy companion app.'],
    accessibility: [
      'A friendly doctor-style guide and a pink and purple visual identity make pregnancy content approachable for new mothers.',
    ],
    vision: ['More accessible pregnancy guidance supported by technology and 3D USG.'],
    tools: [{ name: 'Figma', src: '/img/tools/figma-logo.png' }],
  },
];

export const getProjectDetail = (id?: string): ProjectDetail | undefined =>
  projectDetails.find((project) => project.id === id);
