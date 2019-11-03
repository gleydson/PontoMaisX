/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import leftTransition from '~/config/Transitions/left';
import { SignIn, Home, Profile, Tour } from '~/screens';
import t from '~/services/i18n';
import { colors } from '~/styles';

/**
 * ,
    navigationOptions: {
      tabBarLabel: t('home'),
      tabBarIcon: ({ tintColor }) => (
        <Icon name="gamepad-variant" color={tintColor} size={24} />
      ),
    }
 */
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
      activeTintColor: '#fff',
      inactiveTintColor: '#ddd',
      style: {
        backgroundColor: colors.secondary,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#fff',
      },
      indicatorStyle: {
        backgroundColor: '#fff',
      },
      showIcon: true,
    },
    tabBarPosition: 'bottom',
  }
);

const AppNavigator = createSwitchNavigator(
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
    initialRouteName: 'Tour',
    transitionConfig: leftTransition,
  }
);

export default createAppContainer(AppNavigator);
