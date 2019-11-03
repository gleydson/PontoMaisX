import styled from 'styled-components/native';
import { Text } from 'react-native';

export const Container = styled.View.attrs(({ selected }) => selected && ({
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }))`
  background-color: ${({ selected }) => selected ? '#3AB6AC' : 'rgba(255, 255, 255, 0.3)'};
  padding: 5px;
  width: 45px;
  height: 55px;
  align-items: center;
  border-radius: 13px;
`;

export const DayNumber = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

export const DayWeek = styled.Text`
  font-size: 12px;
  color: #fff;
  text-transform: capitalize;
  text-align: center;
`;