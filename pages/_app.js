import { createContext, useEffect, useState } from 'react';
import Head from 'next/head';
import 'animate.css';
import '../styles/globals.scss';
// import '../styles/responsive.scss';
// import './custom-animation.css';
// import '../styles/custom-circular.css';
// import '../styles/custom-editor.scss';
// import '../styles/custom-style.scss';
// import '../styles/custom-slider.scss';
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
import { SnackBarProvider } from '../components/partials/snack-bar';
import { getToken } from '../helpers/api/auth.service';

const middleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(middleware, logger));

middleware.run(appMiddleware);

const Container = props => {
  const dispatch = useDispatch();
  const fetchUserInfoResponse = useSelector(
    state => state.authReducer.fetchUserInfo
  );
  const [token, setToken] = useState(1);
  useEffect(() => {
    setToken(getToken());
    if (getToken()) {
      dispatch(fetchUserInfo(() => {}));
    }
  }, []);

  return (fetchUserInfoResponse.process > 1 || !token) && <>{props.children}</>;
};

export const AppContext = createContext({});

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  return (
    <Provider store={store}>
      <Head>
        <title>Casper Association Portal</title>
        <link rel="icon" href="/favicon.svg" />
        <meta name="description" content="Casper Association Portal" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <AppContext.Provider value={{ loading, setLoading }}>
        <DialogProvider>
          <SnackBarProvider>
            <Container>
              {loading && <AppLoading />}
              <Component {...pageProps} />
            </Container>
            <AppResolver />
          </SnackBarProvider>
        </DialogProvider>
      </AppContext.Provider>
    </Provider>
  );
}

export default MyApp;
