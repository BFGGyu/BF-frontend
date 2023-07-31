import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='theme-color' content='#3D39F1' />
        <link rel='manifest' href='/manifest.json' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
