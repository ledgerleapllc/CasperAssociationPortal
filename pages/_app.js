import Head from 'next/head';
import '../styles/globals.scss';
import 'animate.css';
import '../styles/custom-animation.scss';
import '../styles/responsive.scss';
import '../styles/custom-circular.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Casper Association Portal</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Casper Association Portal" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
