import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  addEmployeeInformation: ['employee'],
  addGenderSuccess: ['gender'],
  addGenderFailure: ['error'],
});

const INITIAL_STATE = Immutable({});

const addEmployeeInformation = (state = INITIAL_STATE, { employee }) =>
  state.merge({ ...employee });

const addGenderSuccess = (state = INITIAL_STATE, { gender }) =>
  state.merge({ gender });

export default createReducer(INITIAL_STATE, {
  [Types.ADD_EMPLOYEE_INFORMATION]: addEmployeeInformation,
  [Types.ADD_GENDER_SUCCESS]: addGenderSuccess,
});

export const Selectors = {
  employee: state => state.employee,
  firstName: state => state.employee.firstName,
  photo: state => `http:${state.employee.photo.medium_url}`,
  photoSmall: state => `http:${state.employee.photo.small_url}`,
};
