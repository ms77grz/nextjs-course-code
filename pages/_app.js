import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import Notification from '../components/ui/notification';
import { NotificationContextProvider } from '../store/notification-context';

export default function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name='description' content='NextJS Events' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
        </Head>
        <Component {...pageProps} />
        <Notification title='test' message='This is a test.' status='success' />
      </Layout>
    </NotificationContextProvider>
  );
}
