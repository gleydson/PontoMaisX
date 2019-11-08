import axios from 'axios';

const apiGender = axios.create({
  baseURL: 'https://genderapi.io/api',
});

const api = axios.create({
  baseURL: 'https://api.pontomais.com.br/api',
});

export function getGender(name) {
  return apiGender.get(`/?name=${name}`);
}

export function signIn(email, password) {
  return api.post('/auth/sign_in', { email, password });
}

export function session(uid, accessToken, client) {
  return api.get('/session', {
    headers: {
      uid,
      'access-token': accessToken,
      'token-type': 'Bearer',
      client,
    },
  });
}

export function wordDays(
  startDate,
  endDate,
  sortDirection,
  sortProperty,
  withEmployee,
  uid,
  accessToken,
  client
) {
  return api.get(
    '/time_card_control/current/work_days',
    {
      start_date: startDate,
      end_date: endDate,
      sort_direction: sortDirection,
      sort_property: sortProperty,
      with_employee: withEmployee,
    },
    {
      headers: {
        uid,
        'access-token': accessToken,
        'token-type': 'Bearer',
        client,
      },
    }
  );
}

// address: 'Av. Washington Soares, 909 - Edson Queiroz, Fortaleza - CE, 60811-341, Brasil'

export function hitPoint(
  latitude,
  longitude,
  address,
  accessToken,
  uid,
  uuid,
  client
) {
  return api.post(
    '/time_cards/register',
    {
      time_card: {
        latitude,
        longitude,
        address,
        reference_id: null,
        original_latitude: -3.7625724,
        original_longitude: -38.4818703,
        original_address:
          'Av. Washington Soares, 909 - Edson Queiroz, Fortaleza - CE, 60811-341, Brasil',
        location_edited: false,
      },
      _path: '/meu_ponto/registro_de_ponto',
      _device: {
        manufacturer: null,
        model: null,
        uuid: null,
        version: null,
        browser: {
          name: 'Chrome',
          version: '78.0.3904.70',
          versionSearchString: 'Chrome',
        },
      },
      _appVersion: '0.10.32',
    },
    {
      client,
      uid,
      uuid,
      'token-type': 'Bearer',
      'api-version': 2,
      'access-token': accessToken,
    }
  );
}

export default api;
