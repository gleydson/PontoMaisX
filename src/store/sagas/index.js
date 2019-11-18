import { all } from 'redux-saga/effects';

import signIn from './signIn';
import workDay from './workDay';

export default function* rootSaga() {
  return yield all([signIn, workDay]);
}
