import { object, shape, func, string } from 'prop-types';
import React from 'react';
import OnBoarding from 'react-native-app-intro-slider';
import uuid from 'uuid/v4';

import angryEmoji from '~/assets/lotties/angry-emoji.json';
import link from '~/assets/lotties/link.json';
import touch from '~/assets/lotties/touch.json';
import workingRoom from '~/assets/lotties/working-room.json';
import t from '~/services/i18n';
import { SIGN_IN } from '~/services/screenName';

import {
  Container,
  ContainerAnimation,
  Animation,
  ContainerText,
  Title,
  Description,
} from './styled';

const slides = [
  {
    key: uuid(),
    title: 'Title 1',
    description: 'Description. Say something cool',
    lottieFile: workingRoom,
  },
  {
    key: uuid(),
    title: 'Title 2',
    description: 'Other cool stuff',
    lottieFile: link,
  },
  {
    key: uuid(),
    title: 'Rocket guy',
    description: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    lottieFile: angryEmoji,
  },
  {
    key: uuid(),
    title: 'Rocket guy',
    description: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    lottieFile: touch,
  },
];

function renderItem({ item: { key, title, description, lottieFile } }) {
  return (
    <Container key={key}>
      <ContainerAnimation>
        <Animation source={lottieFile} autoPlay resizeMode="contain" loop />
      </ContainerAnimation>
      <ContainerText>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </ContainerText>
    </Container>
  );
}

export default function Tour({ navigation }) {
  function goToSignInScreen() {
    navigation.navigate(SIGN_IN);
  }
  return (
    <Container>
      <OnBoarding
        slides={slides}
        renderItem={renderItem}
        showPrevButton
        showSkipButton
        skipLabel={t('skip')}
        nextLabel={t('next')}
        prevLabel={t('prev')}
        doneLabel={t('done')}
        onSkip={goToSignInScreen}
        onDone={goToSignInScreen}
      />
    </Container>
  );
}

Tour.propTypes = {
  navigation: shape({
    navigate: func,
  }).isRequired,
};

renderItem.propTypes = {
  item: object.isRequired,
  key: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  lottieFile: object.isRequired,
};
