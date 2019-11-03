import { shape, func } from 'prop-types';
import React from 'react';
import { Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import DayButton from '~/components/DayButton';
import TopBar from '~/components/TopBar';
import t from '~/services/i18n';
import { Selectors as EmployeeSelectors } from '~/store/ducks/employee';
import { Creators as SignInCreators } from '~/store/ducks/signIn';

import {
  Container,
  ContainerDate,
  TextDate,
  ContainerDaysOfWeek,
  Header,
  ContainerInner,
  Content,
  ContentInner,
  Text,
  Line,
} from './styled';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  let offset = 0;
  const translateY = new Animated.Value(0);
  const profileImage = useSelector(EmployeeSelectors.photoSmall);
  const animatedEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const translateYInterpolate = translateY.interpolate({
    inputRange: [0, 500],
    outputRange: [0, 500],
    extrapolate: 'clamp',
  });

  function onHandlerStateChange(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;
      offset += translationY;

      if (translationY >= 200) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 500 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 500 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  function handlePressProfile() {
    navigation.navigate('Profile');
  }

  function handlePressLogout() {
    dispatch(SignInCreators.logout());
  }

  return (
    <Container>
      <Header>
        <TopBar
          leftIcon="exit-to-app"
          leftAction={handlePressLogout}
          rightAction={handlePressProfile}
          titleScreen={t('home')}
          image={profileImage}
          rightIcon="account-circle"
        />
        <ContainerDate>
          <TextDate>Novembro 2019</TextDate>
          <ContainerDaysOfWeek>
            <DayButton dayNumber={1} dayWeek="Dom" />
            <DayButton dayNumber={2} dayWeek="Seg" isSelected />
            <DayButton dayNumber={3} dayWeek="Ter" />
            <DayButton dayNumber={4} dayWeek="Qua" />
            <DayButton dayNumber={5} dayWeek="Qui" />
            <DayButton dayNumber={6} dayWeek="Sex" />
            <DayButton dayNumber={7} dayWeek="Sab" />
          </ContainerDaysOfWeek>
        </ContainerDate>
      </Header>
      <ContainerInner>
        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChange}>
          <Content
            style={{ transform: [{ translateY: translateYInterpolate }] }}>
            <Line />
            <ContentInner>
              <Text>Exemplo</Text>
              <Text>Exemplo</Text>
              <Text>Exemplo</Text>
              <Text>Exemplo</Text>
              <Text>Exemplo</Text>
            </ContentInner>
          </Content>
        </PanGestureHandler>
      </ContainerInner>
    </Container>
  );
}

Home.propTypes = {
  navigation: shape({
    navigate: func,
  }).isRequired,
};
