import { combineReducers } from 'redux';
import { demoDataReducer } from './dashboard/dashboard-reduces';
import { apiControllerReducer } from './api-controller/api-controller-reduces';

const appReducer = combineReducers({ apiControllerReducer, demoDataReducer });

export default appReducer;
