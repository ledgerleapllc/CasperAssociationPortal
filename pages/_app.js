import Head from 'next/head';
import '../styles/globals.scss';
import 'animate.css';
import '../styles/custom-animation.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Casper Association Portal</title>
        <meta name="description" content="Casper Association Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
