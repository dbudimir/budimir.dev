import type { Project } from '../types';

export const projects: Project[] = [
  {
    h3: 'Squad',
    videoId: 'squad',
    images: [{ src: '/static/images/squad-website.webp', alt: 'Squad website thumbnail', height: 242, width: 446 }],
    description: [
      'Squad is a full-featured SaaS product that makes it easier for small teams to stay on the same page, week-to-week.',
      'This is my first side business, designed to scale for thousands of users and generate recurring revenue.',
    ],
    tags: ['react', 'next.js', 'mongodb', 'wordpress', 'socket.io', 'stripe api'],
    links: [
      { linkText: 'squad.lol', url: 'https://squad.lol/' },
      { linkText: 'watch video', url: 'https://www.youtube.com/watch?v=e_f3XnWO2KA' },
    ],
  },
  {
    h3: 'Queen Ballers',
    videoId: null,
    images: [
      { src: '/static/images/queen-ballers.webp', alt: 'Queen ballers website thumbnail', height: 242, width: 446 },
      { src: '/static/images/qb-mobile-thumb.webp', alt: 'Queen ballers mobile thumbnail', height: 242, width: 122 },
    ],
    description: [
      "Queen Ballers provides in depth women's basketball coverage, player highlights, & drills for athletes.",
      'This site is a headless wordpress project built on the latest version of Next.js. I maintain this site regularly as a way to stay on top of the most recent features in Next.js including the app router, and partial pre-rendering.',
    ],
    tags: ['react', 'next.js', 'mongodb', 'headless wordpress', 'cheerio'],
    links: [{ linkText: 'queen-ballers.vercel.app', url: 'https://queen-ballers.vercel.app/' }],
  },
  {
    h3: 'Greywing',
    videoId: 'greywing',
    images: [
      { src: '/static/images/grey-wing-marketing.webp', alt: 'Greywing website thumbnail', height: 242, width: 446 },
    ],
    description: [
      'I worked with Greywing to build out the initial version of their cargo ship fleet management platform, and their marketing website.',
    ],
    tags: ['react', 'next.js', 'leaflet', 'mapbox studio', 'google maps api'],
    links: [{ linkText: 'grey-wing.com', url: 'https://greywing-marketing-caqps9urj-dbudi.vercel.app/' }],
  },
  {
    h3: 'Vodium',
    videoId: 'qW8KuYBWwCU',
    images: [
      { src: '/static/images/vodium-website.webp', alt: 'Vodium website thumbnail', height: 242, width: 446 },
      { src: '/static/images/vodium.webp', alt: 'Vodium thumbnail', height: 242, width: 446 },
    ],
    description: [
      'An Electron app for macOS and Windows. Vodium is a simple teleprompter that makes it easier to deliver speeches over online video conferences.',
      'I built this turnkey SaaS business for a client, which includes a marketing website and payment implementation via Stripe.',
    ],
    tags: ['electron', 'react', 'mongodb', 'wordpress', 'stripe api'],
    links: [{ linkText: 'vodium.us', url: 'https://vodium.us/' }],
  },
  {
    h3: 'Mealdig',
    videoId: null,
    images: [
      { src: '/static/images/mealdig.webp', alt: 'Mealdig thumbnail', height: 242, width: 446 },
      { src: '/static/images/order-4-thumb.webp', alt: 'Mealdig older thumbnail', height: 242, width: 446 },
      { src: '/static/images/qsr-thumb.webp', alt: 'API data model thumbnail', height: 242, width: 446 },
    ],
    description: [
      'A search engine optimized site with dynamically generated pages, based on user-generated content. Mealdig lets users share their favorite custom orders at quick service restaurants like Chipotle and &pizza.',
    ],
    tags: ['react', 'next.js', 'typescript', 'graphql', 'node', 'express', 'mongoose'],
    links: [
      { linkText: 'mealdig.com', url: 'https://mealdig.com/' },
      { linkText: 'open repo', url: 'https://github.com/dbudimir/mealdig' },
    ],
  },
  {
    h3: 'EVERFI Training Survey',
    videoId: null,
    images: [
      { src: '/static/images/everfi-survey-thumb.webp', alt: 'Everfi survey thumbnail', height: 242, width: 446 },
      {
        src: '/static/images/everfi-survey-mobile-thumb.webp',
        alt: 'Everfi survey mobile thumb',
        height: 242,
        width: 122,
      },
    ],
    description: [
      'A custom Javascript survey designed to engage leads.',
      'This survey integrates directly with a Google sheet so that the marketing team could quickly access the results.',
    ],
    tags: ['javascript', 'html', 'css', 'google sheets api'],
    links: [{ linkText: 'view survey', url: 'https://everfi.com/surveys/workplace-training-evaluation/' }],
  },
  {
    h3: 'NBA Starting Five',
    videoId: null,
    images: [
      { src: '/static/images/starting-five-thumb.webp', alt: 'Nba starting 5 thumbnail', height: 242, width: 446 },
      { src: '/static/images/starting-five-mobile.webp', alt: 'Nba starting 5 mobile', height: 242, width: 122 },
    ],
    description: [
      'Users can create and share a list of their top NBA players for any custom sub-category they choose. For example, top 5 best dunkers, European players, best all time Lakers, etc.',
      'This app uses a public database to capture player stats and calls the Bing API to grab player photos.',
    ],
    tags: ['react', 'node', 'express', 'bing api'],
    links: [{ linkText: 'open repo', url: 'https://github.com/dbudimir/nba-starting-five' }],
  },
  {
    h3: 'Simon',
    videoId: null,
    images: [
      { src: '/static/images/simon-thumb.webp', alt: 'Simon thumbnail', height: 242, width: 446 },
      { src: '/static/images/simon-mobile-thumb.webp', alt: 'Simon mobile thumbnail', height: 242, width: 122 },
    ],
    description: [
      'My first Javascript project. Simon is memory game where the player is given a click pattern that they have to replicate.',
      'After they successfully reproduce the pattern, the game will add one more item to the sequence and the user will need to replicate the pattern again from the start.',
    ],
    tags: ['javascript', 'html', 'css'],
    links: [
      { linkText: 'play simon', url: '../../static/simon/index.html' },
      { linkText: 'open repo', url: 'https://github.com/dbudimir/simon' },
    ],
  },
];

export default projects;
