import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBannerNotifications,
  getPopupNotifications,
} from '../../shared/redux-saga/auth/actions';

export default function useNotifications() {
  const bannerNotis = useSelector(
    state => state.authReducer?.notifications?.banner
  );
  const popupNotis = useSelector(
    state => state.authReducer?.notifications?.popup
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!bannerNotis) {
      dispatch(getBannerNotifications());
    }
  }, [bannerNotis]);

  useEffect(() => {
    const value = localStorage.getItem('SEEN_POPUP_NOTIFICATIONS');
    if (!popupNotis && !value) {
      dispatch(getPopupNotifications());
    }
  }, [popupNotis]);

  return { bannerNotis, popupNotis };
}
