import { func, node, string } from 'prop-types';
import React from 'react';

import {
  TopBarContainer,
  LeftButton,
  Icon,
  ContainerTitle,
  TitleScreen,
  RightButton,
  Image,
} from './styled';

export default function TopBar({
  leftIcon,
  rightIcon,
  image,
  leftAction,
  rightAction,
  titleScreen,
}) {
  return (
    <TopBarContainer>
      <LeftButton onPress={leftAction}>
        <Icon name={leftIcon} />
      </LeftButton>
      <ContainerTitle>
        <TitleScreen>{titleScreen}</TitleScreen>
      </ContainerTitle>
      <RightButton onPress={rightAction}>
        {image ? <Image source={{ uri: image }} /> : <Icon name={rightIcon} />}
      </RightButton>
    </TopBarContainer>
  );
}

TopBar.propTypes = {
  leftIcon: string.isRequired,
  rightIcon: string,
  image: node,
  leftAction: func.isRequired,
  rightAction: func,
  titleScreen: string.isRequired,
};

TopBar.defaultProps = {
  image: null,
  rightAction: () => {},
  rightIcon: null,
};
