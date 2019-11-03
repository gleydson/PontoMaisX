import { Animated } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

import { colors } from '~/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.primary};
`;

export const Header = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: space-between;
`;

export const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: row;
  align-content: center;
`;

export const ExitButton = styled.TouchableOpacity``;

export const TitleScreen = styled.Text`
  font-size: 23px;
  color: #fff;
  font-weight: bold;
`;

export const ContainerProfilePhoto = styled.TouchableOpacity``;

export const Photo = styled.Image`
  border-radius: 19px;
  width: 30px;
  height: 30px;
`;

export const ContainerDate = styled.View``;

export const TextDate = styled.Text`
  font-size: 20px;
  color: #fff;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const ContainerDaysOfWeek = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ContainerInner = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 11,
  },
  shadowOpacity: 0.57,
  shadowRadius: 15.19,
  elevation: 23,
})`
  flex: 3;
  max-height: 550px;
  z-index: 5;
`;

export const Content = styled(Animated.View)`
  flex: 1;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  background-color: #fff;
  height: 100%;
  margin: 0 20px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Line = styled.View`
  background-color: #e0dfe4;
  width: 100px;
  height: 5px;
  border-radius: 10px;
  align-self: center;
  margin: 10px 0;
`;

export const ContentInner = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 10px;
`;

export const Text = styled.Text``;

export const Icon = styled(MaterialIcon)``;
