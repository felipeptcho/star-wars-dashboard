import { ApolloProvider } from '@apollo/client/react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import client from '@/api/client';

import 'antd/dist/antd.css';
import '@/styles/tailwind.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Star Wars</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ApolloProvider client={client}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ApolloProvider>
  </>
);

export default MyApp;
