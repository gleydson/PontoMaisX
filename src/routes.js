/* eslint-disable react/prop-types */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import leftTransition from '~/config/Transitions/left';
import { SignIn, Home, Profile, Tour } from '~/screens';
import t from '~/services/i18n';
import { colors } from '~/styles';

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: t('home'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" color={tintColor} size={24} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: colors.white,
      inactiveTintColor: '#ddd',
      style: {
        backgroundColor: colors.secondary,
        borderTopWidth: 0,
      },
      indicatorStyle: {
        backgroundColor: colors.secondary,
        borderWidth: 0,
      },
      showIcon: true,
    },
    tabBarPosition: 'bottom',
  }
);

function getInitialRouteName(signed) {
  if (signed) {
    return 'Main';
  }
  return 'SignIn';
}

export default signed =>
  createAppContainer(
    createSwitchNavigator(
      {
        Tour,
        SignIn,
        Main: createStackNavigator(
          { Tab: TabNavigator, Profile },
          {
            headerMode: 'none',
            navigationOptions: {},
            transitionConfig: leftTransition,
          }
        ),
      },
      {
        initialRouteName: getInitialRouteName(signed),
      }
    )
  );
