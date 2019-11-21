import { shape, func } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Animated, Easing, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/images/logo.png';
import check from '~/assets/lotties/success.json';
import t from '~/services/i18n';
import NavigationService from '~/services/navigation';
import { HOME } from '~/services/screenName';
import {
  Creators as SignInActions,
  Selectors as SignInSelectors,
} from '~/store/ducks/signIn';
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
  Loader,
} from './styled';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const isShowCheckAnimation = useSelector(
    SignInSelectors.isShowCheckAnimation
  );
  const isLogged = useSelector(SignInSelectors.isLogged);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [widthSubmit] = useState(new Animated.Value(metrics.inputWidth));
  const [progressButtonAnimation] = useState(new Animated.Value(0));
  const [progressCheckAnimation] = useState(new Animated.Value(0));
  const [opacityAnimation] = useState(new Animated.Value(1));
  const [isShowLoader, setIsShowLoader] = useState(false);

  const colorInterpolate = progressButtonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.secondary, colors.check],
    extrapolate: 'clamp',
  });
  const submitStyle = { width: widthSubmit, backgroundColor: colorInterpolate };
  const textSubmitStyle = { opacity: opacityAnimation };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setIsKeyboardOpen(true));
    Keyboard.addListener('keyboardDidHide', () => setIsKeyboardOpen(false));

    if (isShowCheckAnimation) {
      Animated.timing(progressCheckAnimation, {
        toValue: 1,
        duration: 1100,
        easing: Easing.linear,
      }).start(({ finished }) => {
        if (finished) {
          dispatch(SignInActions.setIsLogged(true));
        }
      });
    }

    if (isLogged) {
      NavigationService.navigate(HOME);
    }

    return () => {
      Keyboard.removeListener('keyboardDidShow');
      Keyboard.removeListener('keyboardDidHide');
    };
  }, [isShowCheckAnimation, isLogged]);

  function handleSubmit() {
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(widthSubmit, {
        toValue: 50,
        duration: 800,
        easing: Easing.ease,
      }),
      Animated.timing(progressButtonAnimation, {
        toValue: 1,
        duration: 800,
        easing: Easing.ease,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 600,
        easing: Easing.ease,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setIsShowLoader(true);
      }
    });
    dispatch(SignInActions.loginRequest(email, password));
  }

  return (
    <Container>
      <ContainerLogo>
        <Logo source={logo} />
      </ContainerLogo>
      <Form>
        <Email
          placeholder={t('typeEmail')}
          onChangeText={setEmail}
          value={email}
        />
        <Password
          placeholder={t('typePassword')}
          onChangeText={setPassword}
          value={password}
        />
        <SubmitContainer onPress={handleSubmit}>
          {isShowCheckAnimation ? (
            <Animation
              source={check}
              resizeMode="contain"
              loop={false}
              progress={progressCheckAnimation}
            />
          ) : (
            <Submit style={submitStyle}>
              {isShowLoader ? (
                <Loader color={colors.white} />
              ) : (
                <TextSubmit style={textSubmitStyle}>{t('signIn')}</TextSubmit>
              )}
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
