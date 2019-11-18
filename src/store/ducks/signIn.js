import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: ['uid', 'accessToken', 'client'],
  loginFailure: ['error'],
  logout: null,
  sessionSuccess: ['employeeFirstName'],
  sessionFailure: ['error'],
  resetAfterLogout: null,
  setIsLogged: ['status'],
});

const INITIAL_STATE = Immutable({
  isLogged: false,
  isShowCheckAnimation: false,
  uid: '',
  accessToken: '',
  client: '',
});

const loginSuccess = (state = INITIAL_STATE, { uid, accessToken, client }) =>
  state.merge({ uid, accessToken, client });

const sessionSuccess = (state = INITIAL_STATE) =>
  state.merge({ isShowCheckAnimation: true });

const setIsLogged = (state = INITIAL_STATE, { status }) =>
  state.merge({ isLogged: status });

export default createReducer(INITIAL_STATE, {
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.SESSION_SUCCESS]: sessionSuccess,
  [Types.SET_IS_LOGGED]: setIsLogged,
});

export const Selectors = {
  isLogged: state => state.signIn.isLogged,
  isShowCheckAnimation: state => state.signIn.isShowCheckAnimation,
  uid: state => state.signIn.uid,
  accessToken: state => state.signIn.accessToken,
  client: state => state.signIn.client,
};
