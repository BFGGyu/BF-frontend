import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content='#3D39F1' />
          <meta
            name='description'
            content='A service that provides a safe route for wheelchair users to enjoy cultural life.'
          ></meta>
          <link rel='manifest' href='/manifest.json' />
          <link
            href='https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/variable/woff2/SUIT-Variable.css'
            rel='stylesheet'
          />
          <link rel='icon' href='favicon.ico' type='image/x-icon' />

          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src='https://code.jquery.com/jquery-3.2.1.min.js' />
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            src={`https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.NEXT_PUBLIC_TMAP_KEY}`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
