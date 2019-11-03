import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '~/config/Reactotron';
import '~/config/StatusBar';
import getPersistenceFunctions from '~/config/PersistNavigation';
import Routes from '~/routes';
import NavigationService from '~/services/navigation';
import { store, persistor } from '~/store';

export default function() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes
          ref={NavigationService.setNavigator}
          {...getPersistenceFunctions()}
        />
      </PersistGate>
    </Provider>
  );
}
