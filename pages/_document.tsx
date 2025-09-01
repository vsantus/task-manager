// pages/_document.tsx
import * as React from "react";
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

import createEmotionServer from "@emotion/server/create-instance";

import theme from "../theme";
import createEmotionCache from "../createEmotionCache";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="pt-BR">
                <Head>
                    {/* PWA primary color */}
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    {/* Injeção das tags de estilo geradas pelo Emotion (SSR) */}
                    {(this.props as any).emotionStyleTags}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const originalRenderPage = ctx.renderPage;

    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp:
                (App: any) =>
                    (props) =>
                        <App emotionCache={cache} {...props} />,
        });

    const initialProps = await Document.getInitialProps(ctx);

    // Extrai os estilos críticos pro SSR
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(" ")}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};
