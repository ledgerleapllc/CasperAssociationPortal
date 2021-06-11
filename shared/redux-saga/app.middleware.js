import { all } from 'redux-saga/effects';
import { watchDemoData } from './dashboard/dashboard.middleware';

export default function* appMiddleware() {
  yield all([watchDemoData()]);
}
