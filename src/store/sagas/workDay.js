import { format } from 'date-fns';
import { call, put, all, takeLatest, select } from 'redux-saga/effects';

import * as ApiService from '~/services/api';
import { Creators as ShimmerUiCreators } from '~/store/ducks/shimmerUi';
import { Selectors as SelectorsCreators } from '~/store/ducks/signIn';
import {
  Types as WorkDayTypes,
  Creators as WorkDayCreators,
} from '~/store/ducks/workDay';

function* getWorkDay(action) {
  yield put(ShimmerUiCreators.handleShimmerPoints(false));

  const { date } = action;
  const uid = yield select(SelectorsCreators.uid);
  const accessToken = yield select(SelectorsCreators.accessToken);
  const client = yield select(SelectorsCreators.client);

  try {
    const {
      data: { work_day },
    } = yield call(
      ApiService.workDay,
      format(date, "yyyy'-'M'-'dd"),
      uid,
      accessToken,
      client
    );
    yield put(WorkDayCreators.workDaySuccess(work_day.time_cards));
    yield put(ShimmerUiCreators.handleShimmerPoints(true));
  } catch (error) {
    yield put(WorkDayCreators.workDayFailure(error));
  }
}

export default all([takeLatest(WorkDayTypes.WORK_DAY_REQUEST, getWorkDay)]);
