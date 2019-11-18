import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  workDayRequest: ['date'],
  workDaySuccess: ['workDay'],
  workDayFailure: ['error'],
});

const INITIAL_STATE = Immutable({
  currentWorkDay: [],
});

const workDaySuccess = (state = INITIAL_STATE, { workDay }) =>
  state.merge({ currentWorkDay: workDay });

export default createReducer(INITIAL_STATE, {
  [Types.WORK_DAY_SUCCESS]: workDaySuccess,
});

export const Selectors = {
  currentWorkDay: state => state.workDay.currentWorkDay,
};
