import { shape, func } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Animated, Easing, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';

import logo from '~/assets/images/logo.png';
import check from '~/assets/lotties/success.json';
import t from '~/services/i18n';
import { Creators as SignInActions } from '~/store/ducks/signIn';
import { colors, metrics } from '~/styles';

import {
  Container,
  ContainerLogo,
  Logo,
  Form,
  Email,
  Password,
  SubmitContainer,
  Submit,
  TextSubmit,
  Tour,
  Icon,
  Animation,
} from './styled';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('grodrigues@greenmile.com.br');
  const [password, setPassword] = useState('js22a@11');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [widthSubmit] = useState(
    new Animated.Value(metrics.widthScreen * 0.75)
  );
  const [progressAnimation] = useState(new Animated.Value(0));
  const [opacityAnimation] = useState(new Animated.Value(1));
  const [isShowCheck, setIsShowCheck] = useState(false);

  const colorInterpolate = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.secondary, '#3bbd5e'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setIsKeyboardOpen(true));
    Keyboard.addListener('keyboardDidHide', () => setIsKeyboardOpen(false));
    return () => {
      Keyboard.removeListener('keyboardDidShow');
      Keyboard.removeListener('keyboardDidHide');
    };
  }, []);

  function handleSubmit() {
    Animated.parallel([
      Animated.timing(widthSubmit, {
        toValue: 50,
        duration: 700,
        easing: Easing.ease,
      }),
      Animated.timing(progressAnimation, {
        toValue: 1,
        duration: 700,
        easing: Easing.ease,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setIsShowCheck(true);
      }
    });
    dispatch(SignInActions.loginRequest(email, password));
  }

  const submitStyle = { width: widthSubmit, backgroundColor: colorInterpolate };
  const textSubmitStyle = { opacity: opacityAnimation };

  return (
    <Container>
      <ContainerLogo>
        <Logo source={logo} />
      </ContainerLogo>
      <Form>
        <Email
          autoCompleteType="off"
          autoCapitalize="characters"
          placeholder={t('typeEmail')}
          onChangeText={setEmail}
          autoCorrect={false}
          value={email}
        />
        <Password
          placeholder={t('typePassword')}
          onChangeText={setPassword}
          autoCapitalize="characters"
          autoCorrect={false}
          value={password}
        />
        <SubmitContainer onPress={handleSubmit}>
          {isShowCheck ? (
            <Animation
              source={check}
              autoPlay
              resizeMode="contain"
              loop={false}
            />
          ) : (
            <Submit style={submitStyle}>
              <TextSubmit style={textSubmitStyle}>{t('signIn')}</TextSubmit>
            </Submit>
          )}
        </SubmitContainer>
      </Form>
      {!isKeyboardOpen && (
        <Tour onPress={() => navigation.navigate('Tour')}>
          <Icon size={32} name="flight-takeoff" />
        </Tour>
      )}
    </Container>
  );
}

SignIn.propTypes = {
  navigation: shape({
    navigate: func,
  }).isRequired,
};
