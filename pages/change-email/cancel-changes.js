import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeEmailCancel,
  updateUser,
} from '../../shared/redux-saga/auth/actions';
import { AppContext } from '../_app';

const ChangeEmailCancellation = () => {
  const router = useRouter();
  const { setLoading } = useContext(AppContext);
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.userInfo);

  useEffect(() => {
    setLoading(true);
    const { query } = router;
    dispatch(
      changeEmailCancel(
        query,
        () => {
          dispatch(
            updateUser({
              fullInfo: {
                ...user.fullInfo,
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

export default ChangeEmailCancellation;
