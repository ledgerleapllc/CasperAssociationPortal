import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers';
import { membersReducer, userDetailReducer } from './admin/reducers';
import { demoDataReducer } from './dashboard/dashboard-reducers';
import { apiControllerReducer } from './api-controller/reducers';

const appReducer = combineReducers({
  apiControllerReducer,
  demoDataReducer,
  authReducer,
  membersReducer,
  userDetailReducer,
});

export default appReducer;
