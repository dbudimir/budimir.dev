import type { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';
import { GeistSans } from 'geist/font/sans';
import '../styles/global.scss';

export const metadata: Metadata = {
  icons: {
    icon: '/static/icons/favicon.png',
  },
  verification: {
    google: 'W6Q3AE1kbGUlzyt_wRbCvr13gcfXqympu7hV91DbHWM',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-5KZP39S" />
      <body>
        <div className={GeistSans.className}>{children}</div>
      </body>
    </html>
  );
}
