import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from "next/document";

import React from "react";
import { ServerStyleSheets as MaterialUIStyleSheets } from "@material-ui/core/styles";
import { ServerStyleSheet as StyledComponentsStyleSheets } from "styled-components";
class MyDocument extends Document {
    static async getInitialProps (
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        return await Document.getInitialProps(ctx);
    }

    render () {
        return (
            <Html lang="ja-JP" dir="ltr">
                <Head>
                    <meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover" />
                    {/* windows */}
                    <meta name="msapplication-square70x70logo" content="/site-tile-70x70.png" />
                    <meta name="msapplication-square150x150logo" content="/site-tile-150x150.png" />
                    <meta name="msapplication-wide310x150logo" content="/site-tile-310x150.png" />
                    <meta name="msapplication-square310x310logo" content="/site-tile-310x310.png" />
                    <meta name="msapplication-TileColor" content="#000" />
                    {/* safari */}
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="#222222" />
                    <meta name="apple-mobile-web-app-title" content="tsumiage" />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon-180x180.png"
                    />

                    {/* Add to splash screen for Safari on iOS */}
                    <link href="splashscreens/iphone5_splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
                    <link href="splashscreens/iphone6_splash.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
                    <link href="splashscreens/iphoneplus_splash.png" media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
                    <link href="splashscreens/iphonex_splash.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
                    <link href="splashscreens/iphonexr_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
                    <link href="splashscreens/iphonexsmax_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
                    <link href="splashscreens/ipad_splash.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
                    <link href="splashscreens/ipadpro1_splash.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
                    <link href="splashscreens/ipadpro3_splash.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
                    <link href="splashscreens/ipadpro2_splash.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
                    {/* 一般 */}
                    <meta name="application-name" content="tsumiage" />
                    <meta name="theme-color" content="#000" />
                    <meta name="description" content="this is tsumiage" />
                    <link rel="icon" sizes="192x192" href="/icon-192x192.png" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="manifest" href="/manifest.json" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script async src="https://cdn.jsdelivr.net/npm/pwacompat@2.0.6/pwacompat.min.js" integrity="sha384-GOaSLecPIMCJksN83HLuYf9FToOiQ2Df0+0ntv7ey8zjUHESXhthwvq9hXAZTifA" crossorigin="anonymous"></script>
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const materialUISheets = new MaterialUIStyleSheets();
    const styledComponentsSheets = new StyledComponentsStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => styledComponentsSheets.collectStyles(
                    materialUISheets.collect(<App {...props} />)
                ),
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {styledComponentsSheets.getStyleElement()}
                </>
            ),
        };
    } finally {
        styledComponentsSheets.seal();
    }
};

export default MyDocument;