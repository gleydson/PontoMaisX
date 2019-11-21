import React from 'react';
import useAppState from 'react-native-appstate-hook';
import { useSelector, useDispatch } from 'react-redux';

import '~/config/Reactotron';
import '~/config/StatusBar';
import getPersistenceFunctions from '~/config/PersistNavigation';
import Routes from '~/routes';
import NavigationService from '~/services/navigation';
import { Creators as SettingsCreators } from '~/store/ducks/settings';
import { Selectors as SignInSelectors } from '~/store/ducks/signIn';

export default function() {
  const dispatch = useDispatch();
  const isLogged = useSelector(SignInSelectors.isLogged);

  useAppState({
    onChange: newAppState =>
      dispatch(SettingsCreators.handleStatusApp(newAppState === 'active')),
  });

  const RoutesWrapper = Routes(isLogged);

  return (
    <RoutesWrapper
      ref={NavigationService.setNavigator}
      {...getPersistenceFunctions()}
    />
  );
}
