import { all } from 'redux-saga/effects';

import SignIn from './signIn';

export default function* rootSaga() {
  return yield all([SignIn]);
}
