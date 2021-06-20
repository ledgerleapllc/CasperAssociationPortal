import { combineReducers } from 'redux';
import { membersReducer } from './admin/reducers';
import { demoDataReducer } from './dashboard/dashboard-reducers';
import { apiControllerReducer } from './api-controller/reducers';

const appReducer = combineReducers({
  apiControllerReducer,
  demoDataReducer,
  membersReducer,
});

export default appReducer;
