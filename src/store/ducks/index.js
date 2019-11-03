import { combineReducers } from 'redux';
import { resettableReducer } from 'reduxsauce';

import company from './company';
import employee from './employee';
import SignIn from './signIn';

const resettable = resettableReducer('RESET_AFTER_LOGOUT');

export default combineReducers({
  signIn: resettable(SignIn),
  company: resettable(company),
  employee: resettable(employee),
});
