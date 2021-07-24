import Layout from '../components/layout/layout';
import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
