import styled from 'styled-components/native';

import { metrics, colors, fonts } from '~/styles';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  padding: ${metrics.padding};
  background-color: ${colors.primary};
`;

export const ContainerPhoto = styled.View`
  max-height: ${metrics.heightScreen * 0.4};
  padding: ${metrics.padding};
  justify-content: center;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${metrics.widthScreen * 0.4};
  height: ${metrics.widthScreen * 0.4};
  border-radius: ${(metrics.widthScreen * 0.4) / 2};
  margin: 20px 0;
`;

export const ContainerName = styled.View``;

export const Name = styled.Text`
  color: ${colors.white};
  font-size: ${fonts.bigger};
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  text-transform: capitalize;
`;

export const JobTitle = styled.Text`
  color: ${colors.white};
  font-size: ${fonts.smaller};
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  margin-top: 5px;
`;

export const ContainerInformation = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;
