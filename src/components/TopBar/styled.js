import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

import { colors } from '~/styles';

export const TopBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LeftButton = styled.TouchableOpacity.attrs({
  hitSlop: { top: 20, bottom: 20, left: 20, right: 20 },
})``;

export const ContainerTitle = styled.View``;

export const TitleScreen = styled.Text`
  font-size: 23px;
  color: #fff;
  font-weight: bold;
  text-transform: capitalize;
  letter-spacing: 1px;
`;

export const Icon = styled(MaterialIcon).attrs({
  size: 30,
  color: colors.white,
})``;

export const RightImage = styled.TouchableOpacity.attrs({
  hitSlop: { top: 20, bottom: 20, left: 20, right: 20 },
})`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

export const Image = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;
