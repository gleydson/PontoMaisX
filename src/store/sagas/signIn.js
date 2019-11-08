import { call, put, all, takeLatest } from 'redux-saga/effects';

import * as ApiService from '~/services/api';
import NavigationService from '~/services/navigation';
import { SIGN_IN } from '~/services/screenName';
import { Creators as CompanyCreators } from '~/store/ducks/company';
import { Creators as EmployeeCreators } from '~/store/ducks/employee';
import {
  Types as SignInTypes,
  Creators as SignInCreators,
} from '~/store/ducks/signIn';

function* signIn(action) {
  const { email, password } = action;
  try {
    const {
      data: { client_id, token },
    } = yield call(ApiService.signIn, email, password);
    yield put(SignInCreators.loginSuccess(email, token, client_id));
  } catch (error) {
    yield put(SignInCreators.loginFailure(error));
  }
}

function* getSessionInformation(action) {
  const { uid, accessToken, client } = action;
  try {
    const { data } = yield call(ApiService.session, uid, accessToken, client);
    const companyInfo = data.session.client;
    const employeeInfo = data.session.employee;

    const company = {
      id: companyInfo.id,
      name: companyInfo.name,
      corporateName: companyInfo.corporate_name,
      email: companyInfo.email,
      phone: companyInfo.phone,
      cnpj: companyInfo.cnpj,
      address: {
        street: companyInfo.address.street,
        number: companyInfo.address.number,
        complement: companyInfo.address.complement,
        district: companyInfo.address.district,
        city: companyInfo.address.city.name,
        state: companyInfo.address.state.name,
        country: companyInfo.address.country.name,
      },
    };

    const employee = {
      id: employeeInfo.id,
      name: employeeInfo.name,
      firstName: employeeInfo.first_name,
      lastName: employeeInfo.last_name,
      email: employeeInfo.email,
      photo: employeeInfo.picture,
      team: employeeInfo.team.name,
      department: employeeInfo.department.name,
      shift: employeeInfo.shift.name,
      jobTitle: employeeInfo.job_title.name,
    };

    yield put(CompanyCreators.addCompanyInformation(company));
    yield put(EmployeeCreators.addEmployeeInformation(employee));
    yield put(SignInCreators.sessionSuccess(employee.firstName));
  } catch (error) {
    yield put(SignInCreators.sessionFailure(error));
  }
}

function* logout() {
  NavigationService.navigate(SIGN_IN);
  yield put(SignInCreators.resetAfterLogout());
}

function* getGenderOfEmployee(action) {
  const { employeeFirstName } = action;

  try {
    const {
      data: { gender },
    } = yield call(ApiService.getGender, employeeFirstName);

    yield put(EmployeeCreators.addGenderSuccess(gender));
  } catch (error) {
    yield put(EmployeeCreators.addGenderFailure(error));
  }
}

export default all([
  takeLatest(SignInTypes.LOGIN_REQUEST, signIn),
  takeLatest(SignInTypes.LOGIN_SUCCESS, getSessionInformation),
  takeLatest(SignInTypes.LOGOUT, logout),
  takeLatest(SignInTypes.SESSION_SUCCESS, getGenderOfEmployee),
]);
