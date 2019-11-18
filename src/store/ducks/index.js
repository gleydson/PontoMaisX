import { combineReducers } from 'redux';
import { resettableReducer } from 'reduxsauce';

import company from './company';
import employee from './employee';
import settings from './settings';
import shimmerUi from './shimmerUi';
import signIn from './signIn';
import workDay from './workDay';

const resettable = resettableReducer('RESET_AFTER_LOGOUT');

export default combineReducers({
  signIn: resettable(signIn),
  company: resettable(company),
  employee: resettable(employee),
  workDay: resettable(workDay),
  shimmerUi: resettable(shimmerUi),
  settings,
});
