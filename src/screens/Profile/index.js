import { shape, func } from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import TopBar from '~/components/TopBar';
import t from '~/services/i18n';
import { Selectors as EmployeeSelectors } from '~/store/ducks/employee';

import {
  SafeAreaView,
  ContainerPhoto,
  Photo,
  ContainerName,
  Name,
  JobTitle,
  ContainerInformation,
  Header,
} from './styled';

export default function Profile({ navigation }) {
  const employee = useSelector(EmployeeSelectors.employee);
  const photo = useSelector(EmployeeSelectors.photo);

  function goBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView>
      <Header>
        <TopBar
          leftIcon="keyboard-backspace"
          leftAction={goBack}
          titleScreen={t('profile')}
        />
        <ContainerPhoto>
          <Photo source={{ uri: photo }} />
          <ContainerName>
            <Name>{employee.name}</Name>
            <JobTitle>{employee.jobTitle}</JobTitle>
          </ContainerName>
        </ContainerPhoto>
      </Header>
      <ContainerInformation />
    </SafeAreaView>
  );
}

Profile.propTypes = {
  navigation: shape({
    goBack: func,
  }).isRequired,
};
