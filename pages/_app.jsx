import { Poppins } from 'next/font/google'

const poppins = Poppins({
   weight: ['300', '400', '500', '600', '700'],
   style: ['normal', 'italic'],
   subsets: ['latin'],
})

const MyApp = ({ Component, pageProps }) => (
   <>
      <style jsx global>{`
         html {
            font-family: ${poppins.style.fontFamily};
         }
      `}</style>
      <Component {...pageProps} />
   </>
)

export default MyApp
