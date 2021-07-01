import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers';
import {
  membersReducer,
  userDetailReducer,
  userKYCInfoReducer,
  intakeReducer,
} from './admin/reducers';
import {
  demoDataReducer,
  voteDetailReducer,
  recordVoteReducer,
} from './dashboard/dashboard-reducers';
import { apiControllerReducer } from './api-controller/reducers';
import { onboardReducer } from './onboard/reducers';

const appReducer = combineReducers({
  apiControllerReducer,
  demoDataReducer,
  authReducer,
  membersReducer,
  userDetailReducer,
  userKYCInfoReducer,
  onboardReducer,
  intakeReducer,
  voteDetailReducer,
  recordVoteReducer,
});

export default appReducer;
