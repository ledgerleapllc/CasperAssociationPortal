import { combineReducers } from 'redux';
import { demoDataReducer } from './dashboard/dashboard-reduces';

const appReducer = combineReducers({ demoDataReducer });

export default appReducer;
