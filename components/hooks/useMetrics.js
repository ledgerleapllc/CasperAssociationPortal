import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyMetrics } from '../../shared/redux-saga/auth/actions';

export default function useMetrics() {
  const metrics = useSelector(state => state.authReducer.metrics);
  const metricConfig = useSelector(state => state.authReducer.metricConfig);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!Object.keys(metrics).length) {
      dispatch(getMyMetrics());
    }
  }, [metrics]);

  const refreshMetrics = () => {
    dispatch(getMyMetrics());
  };

  return { metrics, refreshMetrics, metricConfig };
}
