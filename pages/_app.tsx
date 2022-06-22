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
import { ProductsProvider } from '../hooks/context/useProducts';
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
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <ProductsProvider>
         <CartProvider>
          <CssBaseline />
          <Component {...pageProps} />
         </CartProvider>
        </ProductsProvider>
      </ThemeProvider>
    </>
  );
}