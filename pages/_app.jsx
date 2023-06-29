import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { Poppins } from "next/font/google";
import "../styles/global.scss";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// Tag Manager
const tagManagerArgs = { gtmId: "GTM-5KZP39S" };

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
