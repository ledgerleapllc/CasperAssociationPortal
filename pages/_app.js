import { useEffect } from 'react';
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
import { Provider, useDispatch, useSelector } from 'react-redux';
import appReducer from '../shared/redux-saga/app-reducers';
import appMiddleware from '../shared/redux-saga/app-middleware';
import { DialogProvider } from '../components/partials/dialog';
import AppResolver from '../components/layouts/app-resolver';
import { fetchUserInfo } from '../shared/redux-saga/auth/actions';

const middleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(middleware, logger));

middleware.run(appMiddleware);

const Container = props => {
  const dispatch = useDispatch();
  const fetchUserInfoResponse = useSelector(
    state => state.authReducer.fetchUserInfo
  );
  useEffect(() => {
    console.log('app init');
    dispatch(fetchUserInfo());
  }, []);

  return fetchUserInfoResponse.process > 1 && <>{props.children}</>;
};

function MyApp({ Component, pageProps }) {
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
          <Component {...pageProps} />
        </Container>
        <AppResolver />
      </DialogProvider>
    </Provider>
  );
}

export default MyApp;
