import { GoogleTagManager } from '@next/third-parties/google';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import StyledComponentsRegistry from '../lib/registry';
import '../styles/global.scss';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
});

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
    <html lang="en" className={GeistSans.variable}>
      <GoogleTagManager gtmId="GTM-5KZP39S" />
      <body>
        <StyledComponentsRegistry>
          <div className={jetbrainsMono.className}>{children}</div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
