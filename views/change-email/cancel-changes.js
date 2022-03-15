import { useHistory, useLocation } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeEmailCancel,
  updateUser,
} from '../../shared/redux-saga/auth/actions';
import { AppContext } from '../../pages/_app';

const ChangeEmailCancellation = () => {
  const router = useHistory();
  const { setLoading } = useContext(AppContext);
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.userInfo);

  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  const query = useQuery();

  useEffect(() => {
    setLoading(true);
    dispatch(
      changeEmailCancel(
        {
          email: query.get('email'),
          code: query.get('code'),
        },
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
  }, [query]);

  return <div />;
};

export default ChangeEmailCancellation;
