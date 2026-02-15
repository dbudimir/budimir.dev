import { Poppins } from 'next/font/google';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import '../styles/global.scss';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const tagManagerArgs = { gtmId: 'GTM-5KZP39S' };

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <div className={poppins.className}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
