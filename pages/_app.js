import Head from 'next/head';
import '../styles/globals.scss';
import 'animate.css';
import '../styles/custom-animation.scss';
import '../styles/responsive.scss';
import '../styles/custom-circular.scss';
import '../styles/custom-editor.scss';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import appReducer from '../components/shared/app.reducers';
import appMiddleware from '../components/shared/app.middleware';

const middleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(middleware, logger));

middleware.run(appMiddleware);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default MyApp;
