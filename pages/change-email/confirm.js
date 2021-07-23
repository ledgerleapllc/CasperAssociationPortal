import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeEmailConfirm,
  updateUser,
} from '../../shared/redux-saga/auth/actions';
import { AppContext } from '../_app';

const ChangeEmailConfirm = () => {
  const router = useRouter();
  const { setLoading } = useContext(AppContext);
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.userInfo);

  useEffect(() => {
    setLoading(true);
    const { query } = router;
    dispatch(
      changeEmailConfirm(
        query,
        () => {
          dispatch(
            updateUser({
              fullInfo: {
                ...user.fullInfo,
                email: user.fullInfo?.new_email,
                new_email: null,
              },
            })
          );
          setLoading(false);
          router.push('/dashboard/settings');
        },
        () => {
          setLoading(false);
          router.push('/dashboard');
        }
      )
    );
  }, [router.query]);

  return <div />;
};

export default ChangeEmailConfirm;
