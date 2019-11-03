import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  addCompanyInformation: ['company'],
});

const INITIAL_STATE = Immutable({});

const addCompanyInformation = (state = INITIAL_STATE, { company }) =>
  state.merge({ ...company });

export default createReducer(INITIAL_STATE, {
  [Types.ADD_COMPANY_INFORMATION]: addCompanyInformation,
});

export const Selectors = {
  company: state => state.company,
};
