import { GoogleTagManager } from '@next/third-parties/google';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import StyledComponentsRegistry from '../lib/registry';
import '../styles/global.scss';

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
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
        <StyledComponentsRegistry>
          <div className={GeistSans.className}>{children}</div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
