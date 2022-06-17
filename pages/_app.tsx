//React
import * as React from 'react';

//Next
import Head from 'next/head';
import { AppProps } from 'next/app';

//Compnents Framkework MUI
import CssBaseline from '@mui/material/CssBaseline';
import { EmotionCache } from '@emotion/react';

//Styles / Themes
import theme from '../theme';
import '../styles/globals.scss';

//Providers
import { ThemeProvider } from '@mui/material/styles';
import { SessionsProvider } from '../hooks/context/sessions';
import { CartProvider } from '../hooks/context/useCart';
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <title>GdMoney Project</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <SessionsProvider>
         <CartProvider>
          <CssBaseline />
          <Component {...pageProps} />
         </CartProvider>
        </SessionsProvider>
      </ThemeProvider>
    </>
  );
}