import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function useUser({
  urlType = 'public',
  permissionRoute = null,
} = {}) {
  const user = useSelector(state => state.authReducer.userInfo);
  const permissions = useSelector(state => state.authReducer?.permissions);
  const router = useHistory();

  useEffect(() => {
    if (urlType === 'public' || !urlType || !user) {
      return;
    }
    if (user && user?.isLoggedIn) {
      if (user.role === 'member') {
        if (urlType === 'auth') {
          if (user.period === 'verifying') router.push('/verify-email');
          if (user.period === 'onboarding') router.push('/onboard');
          if (user.period === 'final') router.push('/dashboard');
          return;
        }
        if (urlType === 'verifying') {
          if (user.period === 'onboarding') router.push('/onboard');
          if (user.period === 'final') router.push('/dashboard');
          return;
        }
        if (urlType === 'onboarding') {
          if (user.period === 'verifying') router.push('/verify-email');
          if (user.period === 'final') router.push('/dashboard');
          return;
        }
        if (urlType === 'final-member' || urlType === 'final-all') {
          if (user.period === 'verifying') router.push('/verify-email');
          if (user.period === 'onboarding') router.push('/onboard');
          return;
        }
        if (urlType === 'final-admin') {
          if (user.period === 'verifying') router.push('/verify-email');
          if (user.period === 'onboarding') router.push('/onboard');
          if (user.period === 'final') router.push('/dashboard');
        }
      } else if (['admin', 'sub-admin'].includes(user.role)) {
        if (urlType !== 'final-all' && urlType !== 'final-admin') {
          router.push('/admin/dashboard');
        }
        if (
          user.role === 'sub-admin' &&
          permissions &&
          permissionRoute &&
          !permissions[permissionRoute]
        ) {
          router.push('/admin/dashboard');
        }
      }
    } else if (urlType !== 'auth') {
      router.push('/login');
    }
  }, [user, urlType, permissions]);

  return { user };
}
