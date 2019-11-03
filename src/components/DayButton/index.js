import { bool, string, number, func } from 'prop-types';
import React from 'react';

import { Container, DayNumber, DayWeek } from './styled';

export default function DayButton({ dayNumber, dayWeek, isSelected, action }) {
  return (
    <Container selected={isSelected}>
      <DayNumber>{dayNumber}</DayNumber>
      <DayWeek>{dayWeek}</DayWeek>
    </Container>
  );
}

DayButton.propTypes = {
  dayNumber: number.isRequired,
  dayWeek: string.isRequired,
  isSelected: bool,
  action: func,
};

DayButton.defaultProps = {
  isSelected: false,
  action: () => {},
};
