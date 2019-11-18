import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  handleShimmerPoints: ['status'],
});

const INITIAL_STATE = Immutable({
  isPointsVisible: false,
});

const handleShimmerPoints = (state = INITIAL_STATE, { status }) =>
  state.merge({ isPointsVisible: status });

export default createReducer(INITIAL_STATE, {
  [Types.HANDLE_SHIMMER_POINTS]: handleShimmerPoints,
});

export const Selectors = {
  isPointsVisible: state => state.shimmerUi.isPointsVisible,
};
