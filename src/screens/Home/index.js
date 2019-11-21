import { shape, func } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Speedometer from 'react-native-speedometer';
import { useSelector, useDispatch } from 'react-redux';

import DayButton from '~/components/DayButton';
import TopBar from '~/components/TopBar';
import {
  useDaysOfTheCurrentWeek,
  useDayNumber,
  useNameOfDay,
  useCurrentMonthAndYear,
  useIsToday,
  useFormattedWorkDayAndIntervals,
  useHour,
} from '~/hooks/useDate';
import t from '~/services/i18n';
import { Selectors as EmployeeSelectors } from '~/store/ducks/employee';
import { Selectors as ShimmerUiSelectors } from '~/store/ducks/shimmerUi';
import { Creators as SignInCreators } from '~/store/ducks/signIn';
import {
  Creators as WorkDayCreators,
  Selectors as WorkDaySelectors,
} from '~/store/ducks/workDay';
import { colors, metrics } from '~/styles';

import {
  Container,
  ContainerDate,
  TextDate,
  ContainerDaysOfWeek,
  Header,
  Content,
  ContainerPoints,
  ContentInner,
  ContainerPoint,
  TitleContent,
  Text,
  Line,
  Icon,
  PointShimmer,
  IntervalText,
} from './styled';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const profileImage = useSelector(EmployeeSelectors.photoSmall);
  const workDay = useSelector(WorkDaySelectors.currentWorkDay);
  const isPointsVisible = useSelector(ShimmerUiSelectors.isPointsVisible);

  const [selectedDay, setSelectedDay] = useState(new Date());

  useEffect(() => {
    dispatch(WorkDayCreators.workDayRequest(selectedDay));
  }, []);

  let offset = 0;
  const [translateY] = useState(new Animated.Value(0));
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

      if (translationY >= 250) {
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
    // Alert.alert(
    //   'Você realmente desejar sair?',
    //   '',
    //   [
    //     {
    //       text: 'Cancelar',
    //       onDismiss: () => {},
    //       style: 'cancel',
    //     },
    //     { text: 'Sim', onPress: () => dispatch(SignInCreators.logout()) },
    //   ],
    //   { cancelable: false }
    // );
    dispatch(SignInCreators.logout());
  }

  function handleCurrentDay(date) {
    setSelectedDay(date);
    dispatch(WorkDayCreators.workDayRequest(date));
  }

  function getCurrentDate() {
    return useCurrentMonthAndYear();
  }

  function renderDaysOfTheWeek() {
    const daysOfTheCurrentWeek = useDaysOfTheCurrentWeek();
    return daysOfTheCurrentWeek.map(day => (
      <DayButton
        key={useNameOfDay(day)}
        dayNumber={useDayNumber(day)}
        dayWeek={useNameOfDay(day)}
        isToday={useIsToday(day)}
        isSelected={useNameOfDay(selectedDay) === useNameOfDay(day)}
        action={() => handleCurrentDay(day)}
      />
    ));
  }

  function renderPointsOfDay() {
    const { formattedDates, intervals } = useFormattedWorkDayAndIntervals(
      workDay
    );
    const result = [];
    formattedDates.forEach((day, index) => {
      result.push(
        <PointShimmer key={useHour(day)} autoRun visible={isPointsVisible}>
          <ContainerPoint>
            <Icon name="check-circle" size={12} color={colors.check} />
            <Text>{useHour(day)}</Text>
          </ContainerPoint>
        </PointShimmer>
      );
      if (index % 2 !== 0) {
        const interval = intervals.shift();
        result.push(<IntervalText>{interval}</IntervalText>);
      }
    });
    return result;
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
          <TextDate>{getCurrentDate()}</TextDate>
          <ContainerDaysOfWeek>{renderDaysOfTheWeek()}</ContainerDaysOfWeek>
        </ContainerDate>
      </Header>
      <ContainerPoints>
        <Speedometer
          innerCircleStyle={{ backgroundColor: colors.primary }}
          value={50}
          defaultValue={50}
          minValue={0}
          maxValue={100}
          size={metrics.widthScreen * 0.75}
          labels={[
            {
              name: 'Too Slow',
              labelColor: '#ff2900',
              activeBarColor: '#ff2900',
            },
            {
              name: 'Very Slow',
              labelColor: '#ff5400',
              activeBarColor: '#ff5400',
            },
            {
              name: 'Slow',
              labelColor: '#f4ab44',
              activeBarColor: '#f4ab44',
            },
            {
              name: 'Normal',
              labelColor: '#f2cf1f',
              activeBarColor: '#f2cf1f',
            },
            {
              name: 'Fast',
              labelColor: '#14eb6e',
              activeBarColor: '#14eb6e',
            },
            {
              name: 'Unbelievably Fast',
              labelColor: '#00ff6b',
              activeBarColor: '#00ff6b',
            },
          ]}
        />
        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChange}>
          <Content
            style={{ transform: [{ translateY: translateYInterpolate }] }}>
            <Line />
            <ContentInner>
              <TitleContent>{t('yourPoints')}</TitleContent>
              {renderPointsOfDay()}
            </ContentInner>
          </Content>
        </PanGestureHandler>
      </ContainerPoints>
    </Container>
  );
}

Home.propTypes = {
  navigation: shape({
    navigate: func,
  }).isRequired,
};
