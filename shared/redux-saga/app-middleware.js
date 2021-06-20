import { all } from 'redux-saga/effects';
import { watchDemoData } from './dashboard/dashboard-middleware';
import { watchAuth } from './auth/auth-middleware';
import { watchOnboard } from './onboard/middleware';
import { watchAdmin } from './admin/middleware';

export default function* appMiddleware() {
  yield all([watchDemoData(), watchAuth(), watchOnboard(), watchAdmin()]);
}
