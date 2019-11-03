import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

import { metrics, colors, fonts } from '~/styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.primary};
`;

export const ContainerAnimation = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;

export const Animation = styled(LottieView)``;

export const ContainerText = styled.View`
  flex: 2;
  align-items: center;
  padding: ${metrics.padding};
`;

export const Title = styled.Text`
  font-size: ${fonts.big};
  color: ${colors.white};
  font-weight: bold;
  text-transform: uppercase;
  padding: 50px;
`;

export const Description = styled.Text`
  font-size: ${fonts.medium};
  color: ${colors.white};
`;
