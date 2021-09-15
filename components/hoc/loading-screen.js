import React from 'react';
import useUser from '../hooks/useUser';
import AppLoading from '../layouts/app-loading';

export const LoadingScreen =
  (Wrapper, typeRoute, permissionRoute = null) =>
  props => {
    const { user } = useUser({
      urlType: typeRoute,
      permissionRoute,
    });

    if (typeRoute && typeRoute !== 'public') {
      if (!user) {
        return <AppLoading />;
      }

      if (typeRoute === 'auth' && user.isLoggedIn) {
        return <AppLoading />;
      }

      if (typeRoute !== 'auth' && !user.isLoggedIn) {
        return <AppLoading />;
      }

      if (user.role === 'member') {
        if (
          ['final-all', 'final-member'].includes(typeRoute) &&
          user.period !== 'final'
        ) {
          return <AppLoading />;
        }
        if (['verifying'].includes(typeRoute) && user.period !== 'verifying') {
          return <AppLoading />;
        }
        if (
          ['onboarding'].includes(typeRoute) &&
          user.period !== 'onboarding'
        ) {
          return <AppLoading />;
        }
      }

      if (['admin', 'sub-admin'].includes(user.role)) {
        if (['verifying', 'onboarding', 'final-member'].includes(typeRoute)) {
          return <AppLoading />;
        }
      }
    }

    return <Wrapper {...props} />;
  };
