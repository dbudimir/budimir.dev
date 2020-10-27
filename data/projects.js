export const projects = [
   {
      h3: 'Squad😂',
      videoId: 'squad',
      images: [
         { src: '/static/images/squad-website.png', alt: 'Squad website thumbnail' },
         // { src: '../../static/images/vodium.png', alt: 'Vodium thumbnail' },
      ],
      description: [
         'Squad😂 is a full-featured SaaS product that makes it easier for small teams to stay on the same page, week-to-week.',
         'This is my first side business, designed to scale for thousands of users and generate recurring revenue.',
      ],
      tags: ['react', 'nextjs', 'mongodb', 'wordpress', 'socket.io', 'stripe api'],
      links: [{ linkText: 'squad.lol', url: 'https://squad.lol/' }],
   },
   {
      h3: 'Vodium',
      videoId: 'qW8KuYBWwCU',
      images: [
         { src: '/static/images/vodium-website.png', alt: 'Vodium website thumbnail' },
         { src: '/static/images/vodium.png', alt: 'Vodium thumbnail' },
      ],
      description: [
         'An Electron app for macOS and Windows. Vodium is a simple teleprompter that makes it easier to deliver speeches over online video conferences.',
         'I built this turnkey SaaS business for a client, which includes a marketing website and payment implementation via Stripe.',
      ],
      tags: ['Electron', 'react', 'mongodb', 'wordpress', 'stripe api'],
      links: [{ linkText: 'vodium.us', url: 'https://vodium.us/' }],
   },
   {
      h3: 'Mealdig',
      videoId: null,
      images: [
         { src: '/static/images/mealdig.png', alt: 'Mealdig thumbnail' },
         { src: '/static/images/order-4-thumb.png', alt: 'Mealdig older thumbnail' },
         { src: '/static/images/qsr-thumb.png', alt: 'API data model thumbnail' },
      ],
      description: [
         'A search optimized site with dynamically generated pages, based on user-generated content. Mealdig lets users share their favorite custom orders at quick service restaurants like Chipotle and &pizza.',
      ],
      tags: ['React', 'Next.js', 'typescript', 'graphql', 'node', 'Express', 'Mongoose'],
      links: [
         { linkText: 'mealdig.com', url: 'https://mealdig.com/' },
         { linkText: 'open repo', url: 'https://github.com/dbudimir/mealdig' },
      ],
   },
   {
      h3: 'EVERFI: Workplace Training Evaluation Survey',
      videoId: null,
      images: [
         { src: '/static/images/everfi-survey-thumb.png', alt: 'Everfi survey thumbnail' },
         { src: '/static/images/everfi-survey-mobile-thumb.png', alt: 'Everfi survey mobile thumb' },
      ],
      description: [
         'A custom Javascript survey designed to engage leads.',
         'This survey integrates directly with a Google sheet so that the marketing team could quickly access the results. ',
      ],
      tags: ['javascript', 'html', 'css', 'Google sheets api'],
      links: [{ linkText: 'view survey', url: 'https://everfi.com/surveys/workplace-training-evaluation/' }],
   },
   {
      h3: 'NBA Starting Five',
      videoId: null,
      images: [
         { src: '/static/images/starting-five-thumb.png', alt: 'Nba starting 5 thumbnail' },
         { src: '/static/images/starting-five-mobile.png', alt: 'Nba starting 5 mobile' },
      ],
      description: [
         'Users can create and share a list of their top NBA players for any custom sub-category they choose. For example, top 5 best dunkers, European players, best all time Lakers, etc.',
         'This app uses a public database to capture player stats and calls the Bing API to grab player photos',
      ],
      tags: ['React', 'node', 'Express', 'Bing api'],
      links: [{ linkText: 'open repo', url: 'https://github.com/dbudimir/nba-starting-five' }],
   },
   {
      h3: 'Simon',
      videoId: null,
      images: [
         { src: '/static/images/simon-thumb.png', alt: 'Simon thumbnail' },
         { src: '/static/images/simon-mobile-thumb.png', alt: 'Simon mobile thumbnail' },
      ],
      description: [
         'My first Javascript project. Simon is memory game where the player is given a click pattern that they have to replicate.',
         'After they successfully reproduce the pattern, the game will add one more item to the sequence and the user will need to replicate the patter again from the start.',
      ],
      tags: ['Javascript', 'HTML', 'CSS'],
      links: [
         { linkText: 'play simon', url: '../../static/simon/index.html' },
         { linkText: 'open repo', url: 'https://github.com/dbudimir/simon' },
      ],
   },
]

export default projects
