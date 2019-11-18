import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  handleStatusApp: ['status'],
});

const INITIAL_STATE = Immutable({
  isActiveApp: false,
});

const handleStatusApp = (state = INITIAL_STATE, { status }) =>
  state.merge({ isActiveApp: status });

export default createReducer(INITIAL_STATE, {
  [Types.HANDLE_STATUS_APP]: handleStatusApp,
});

export const Selectors = {
  status: state => state.settings.status,
};
