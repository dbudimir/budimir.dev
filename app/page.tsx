import type { Metadata } from 'next';
import HomePage from './page.client';

export const metadata: Metadata = {
  title: 'David Budimir',
  description: 'David Budimir is a software engineer, designer, and SaaS marketing expert.',
  openGraph: {
    description: 'David Budimir is a software engineer, designer, and SaaS marketing expert.',
    images: ['https://www.budimir.dev/static/images/og-image.png'],
  },
  twitter: {
    images: ['https://www.budimir.dev/static/images/og-image.png'],
  },
};

export default function Page() {
  return <HomePage />;
}
