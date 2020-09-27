export const projects = [
   {
      h3: 'Squad',
      videoId: 'squad',
      images: [
         { src: '../../static/images/squad-website.png', alt: 'Squad website thumbnail' },
         // { src: '../../static/images/vodium.png', alt: 'Vodium thumbnail' },
      ],
      description: [
         'An Electron app for macOS and windows. Vodium is a simple teleprompter that makes it easier to deliver speaches over online video conferces.',
         'I built this turnkey SaaS business for a client, including a marketing website and payment implementation via Stripe. ',
      ],
      tags: ['react', 'nextjs', 'mongodb', 'wordpress', 'stripe api'],
      links: [
         { linkText: 'squad.lol', url: 'https://vodium.us/' },
         { linkText: 'open repo', url: '' },
      ],
   },
   {
      h3: 'Vodium',
      videoId: 'qW8KuYBWwCU',
      images: [
         { src: '../../static/images/vodium-website.png', alt: 'Vodium website thumbnail' },
         { src: '../../static/images/vodium.png', alt: 'Vodium thumbnail' },
      ],
      description: [
         'An Electron app for macOS and windows. Vodium is a simple teleprompter that makes it easier to deliver speaches over online video conferces.',
         'I built this turnkey SaaS business for a client, including a marketing website and payment implementation via Stripe. ',
      ],
      tags: ['Electron', 'react', 'mongodb', 'wordpress', 'stripe api'],
      links: [
         { linkText: 'vodium.us', url: 'https://vodium.us/' },
         { linkText: 'open repo', url: '' },
      ],
   },
   {
      h3: 'Mealdig',
      videoId: null,
      images: [
         { src: '../../static/images/mealdig.png', alt: 'Mealdig thumbnail' },
         { src: '../../static/images/order-4-thumb.png', alt: 'Mealdig older thumbnail' },
      ],
      description: [
         'A SEO optimized site with dynamicaly generated pages, based on user-generated content. Mealdig lets users share their favorite custom orders at quick service restaurants like Chipotle and &pizza.',
      ],
      tags: ['React', 'Next.js', 'node', 'Express', 'Mongoose'],
      links: [
         { linkText: 'mealdig.com', url: 'https://mealdig.com/' },
         { linkText: 'open repo', url: 'https://github.com/dbudimir/mealdig' },
      ],
   },
]

export default projects
