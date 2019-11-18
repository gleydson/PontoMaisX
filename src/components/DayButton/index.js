import { bool, string, number, func, oneOfType } from 'prop-types';
import React from 'react';

import { Button, Container, DayNumber, DayWeek } from './styled';

export default function DayButton({ dayNumber, dayWeek, isSelected, action }) {
  return (
    <Button onPress={action}>
      <Container selected={isSelected}>
        <DayNumber>{dayNumber}</DayNumber>
        <DayWeek>{dayWeek}</DayWeek>
      </Container>
    </Button>
  );
}

DayButton.propTypes = {
  dayNumber: oneOfType([number, string]).isRequired,
  dayWeek: string.isRequired,
  isSelected: bool,
  action: func,
};

DayButton.defaultProps = {
  isSelected: false,
  action: () => {},
};
