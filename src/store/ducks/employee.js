import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  addEmployeeInformation: ['employee'],
  addGender: ['gender'],
});

const INITIAL_STATE = Immutable({});

const addEmployeeInformation = (state = INITIAL_STATE, { employee }) =>
  state.merge({ ...employee });

const addGender = (state = INITIAL_STATE, { gender }) =>
  state.merge({ gender });

export default createReducer(INITIAL_STATE, {
  [Types.ADD_EMPLOYEE_INFORMATION]: addEmployeeInformation,
  [Types.ADD_GENDER]: addGender,
});

export const Selectors = {
  employee: state => state.employee,
  firstName: state => `http:${state.employee.firstName}`,
  photo: state => `http:${state.employee.photo.medium_url}`,
  photoSmall: state => `http:${state.employee.photo.small_url}`,
};
