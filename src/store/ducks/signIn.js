import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: ['uid', 'accessToken', 'client'],
  loginFailure: ['error'],
  logout: null,
  sessionSuccess: null,
  sessionFailure: ['error'],
  resetAfterLogout: null,
});

const INITIAL_STATE = Immutable({
  isLogged: false,
});

const loginSuccess = (state = INITIAL_STATE) => state.merge({ isLogged: true });

export default createReducer(INITIAL_STATE, {
  [Types.LOGIN_SUCCESS]: loginSuccess,
});

export const Selectors = {
  isLogged: state => state.signIn.isLogged,
};
