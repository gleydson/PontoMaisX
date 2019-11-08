import LottieView from 'lottie-react-native';
import { Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

import { colors, metrics, fonts } from '~/styles';

export const Container = styled(LinearGradient).attrs({
  colors: ['#806bcd', '#805bca'],
  start: { x: 0.7, y: 0.5 },
  end: { x: 0.5, y: 1 },
})`
  flex: 1;
  padding: ${metrics.padding};
`;

export const ContainerLogo = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 150px;
  height: 150px;
`;

export const Form = styled.View`
  flex: 2;
  justify-content: flex-start;
  align-items: center;
`;

export const Email = styled.TextInput.attrs({
  shadowColor: colors.black,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
  keyboardType: 'email-address',
  placeholderTextColor: '#999',
  autoCapitalize: 'none',
  autoCorrect: false,
  autoCompleteType: 'off',
})`
  background-color: ${colors.white};
  width: ${metrics.inputWidth};
  height: 50px;
  border-radius: 30px;
  margin-bottom: 20px;
  font-size: ${fonts.medium};
  text-align: center;
  text-transform: lowercase;
`;

export const Password = styled.TextInput.attrs({
  shadowColor: colors.black,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
  secureTextEntry: true,
  password: true,
  placeholderTextColor: '#999',
  autoCapitalize: 'none',
  autoCorrect: false,
})`
  background-color: ${colors.white};
  width: ${metrics.inputWidth};
  height: 50px;
  border-radius: 30px;
  margin-bottom: 20px;
  font-size: ${fonts.medium};
  text-align: center;
  text-transform: lowercase;
`;

export const SubmitContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const Submit = styled(Animated.View).attrs({
  shadowColor: colors.black,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
  keyboardType: 'email-address',
})`
  padding: 0 14px;
  margin-top: 10px;
  color: ${colors.secondary};
  border-radius: 30px;
  background-color: ${colors.secondary};
  align-items: center;
  justify-content: center;
  height: 50px;
`;

export const TextSubmit = styled(Animated.Text)`
  font-size: ${fonts.medium};
  text-transform: uppercase;
  color: ${colors.white};
  font-weight: bold;
`;

export const Tour = styled.TouchableNativeFeedback`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(MaterialIcon)`
  color: ${colors.white};
`;

export const Animation = styled(LottieView)`
  width: 90px;
  height: 90px;
`;

export const Loader = styled.ActivityIndicator.attrs({
  size: 'large',
})``;
