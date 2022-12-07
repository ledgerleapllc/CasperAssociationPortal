import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers';
import { apiControllerReducer } from './api-controller/reducers';
import { onboardReducer } from './onboard/reducers';

const appReducer = combineReducers({
  apiControllerReducer,
  authReducer,
  onboardReducer,
});

export default appReducer;
