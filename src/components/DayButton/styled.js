import styled from 'styled-components/native';

import { colors, fonts } from '~/styles';

export const Button = styled.TouchableWithoutFeedback``;

export const Container = styled.View.attrs(
  ({ selected }) =>
    selected && {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }
)`
  background-color: ${({ selected }) =>
    selected ? colors.secondary : 'rgba(255, 255, 255, 0.3)'};
  padding: 5px;
  width: 45px;
  height: 60px;
  align-items: center;
  border-radius: 13px;
`;

export const DayNumber = styled.Text`
  font-size: ${fonts.big};
  color: ${colors.white};
  font-weight: bold;
  text-align: center;
`;

export const DayWeek = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.white};
  text-transform: capitalize;
  text-align: center;
`;

export const Indicator = styled.View`
  background-color: ${colors.white};
  width: 10px;
  height: 2px;
  border-radius: 2px;
  position: absolute;
  top: 4px;
  margin: 0 auto;
`;
