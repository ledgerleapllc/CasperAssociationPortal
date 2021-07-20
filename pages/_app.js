import { createContext, useEffect, useState } from 'react';
import Head from 'next/head';
import '../styles/globals.scss';
import 'animate.css';
import '../styles/custom-animation.scss';
import '../styles/responsive.scss';
import '../styles/custom-circular.scss';
import '../styles/custom-editor.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import { Provider, useDispatch, useSelector } from 'react-redux';
import appReducer from '../shared/redux-saga/app-reducers';
import appMiddleware from '../shared/redux-saga/app-middleware';
import { DialogProvider } from '../components/partials/dialog';
import AppResolver from '../components/layouts/app-resolver';
import { fetchUserInfo } from '../shared/redux-saga/auth/actions';
import AppLoading from '../components/layouts/app-loading';

const middleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(middleware, logger));

middleware.run(appMiddleware);

const Container = props => {
  const dispatch = useDispatch();
  const fetchUserInfoResponse = useSelector(
    state => state.authReducer.fetchUserInfo
  );
  useEffect(() => {
    console.log('app init', process.env.NODE_ENV);
    dispatch(fetchUserInfo(() => {}));
  }, []);

  return fetchUserInfoResponse.process > 1 && <>{props.children}</>;
};

export const AppContext = createContext({});

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  return (
    <Provider store={store}>
      <DialogProvider>
        <Head>
          <title>Casper Association Portal</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Casper Association Portal" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
        </Head>
        <Container>
          <AppContext.Provider value={{ loading, setLoading }}>
            {loading && <AppLoading />}
            <Component {...pageProps} />
          </AppContext.Provider>
        </Container>
        <AppResolver />
      </DialogProvider>
    </Provider>
  );
}

export default MyApp;
