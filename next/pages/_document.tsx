import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#000000" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,viewport-fit=cover"
        />
      </Head>
        <body>
          <Main />
          <NextScript />
          <script
            async
            src="https://cdn.jsdelivr.net/npm/pwacompat@2.0.6/pwacompat.min.js"
            integrity="sha384-GOaSLecPIMCJksN83HLuYf9FToOiQ2Df0+0ntv7ey8zjUHESXhthwvq9hXAZTifA"
            crossOrigin="anonymous"
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
