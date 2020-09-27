import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

// Import styled components ServerStyleSheet
export default class _document extends Document {
   static async getInitialProps(ctx) {
      const sheet = new ServerStyleSheet()
      const originalRenderPage = ctx.renderPage

      try {
         ctx.renderPage = () =>
            originalRenderPage({
               enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
            })

         const initialProps = await Document.getInitialProps(ctx)
         return {
            ...initialProps,
            styles: (
               <>
                  {initialProps.styles}
                  {sheet.getStyleElement()}
               </>
            ),
         }
      } finally {
         sheet.seal()
      }
   }

   render() {
      return (
         <Html>
            <Head>
               <meta charSet="UTF-8" />
               <meta name="google-site-verification" content="VhlIZU1D7S2fGIH5Wzv2Uo_QdYwK69OuoP120eINMik" />
               <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
                  as="font"
                  crossOrigin=""
               />
               <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
                  as="font"
                  crossOrigin=""
               />
               <link rel="icon" href="/static/images/emoji-favicon.png" />
            </Head>
            <body style={{ margin: 0 }}>
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}
