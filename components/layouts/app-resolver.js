import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useDialog } from '../partials/dialog';
import { clearApiResponseError } from '../../shared/redux-saga/api-controller/actions';

export default function AppResolver() {
  const apiState = useSelector(state => state.apiControllerReducer);
  const { setDialog } = useDialog();
  const dispatch = useDispatch();
  useEffect(() => {
    if (apiState?.hasError) {
      if (apiState?.statusError === 422) {
        setDialog({
          type: 'Dialog',
          data: {
            title: 'Error',
            content: Object.values(apiState?.response?.data?.errors)[0],
          },
          afterClosed: () => {
            dispatch(clearApiResponseError());
          },
        });
      } else {
        setDialog({
          type: 'Dialog',
          data: {
            title: 'Error',
            content: apiState?.response?.message,
          },
          afterClosed: () => {
            dispatch(clearApiResponseError());
          },
        });
      }
    }
  }, [apiState]);
  return <></>;
}
