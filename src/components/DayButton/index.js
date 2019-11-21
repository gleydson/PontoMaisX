import { bool, string, number, func, oneOfType } from 'prop-types';
import React from 'react';

import { Button, Container, DayNumber, DayWeek, Indicator } from './styled';

export default function DayButton({
  isToday,
  dayNumber,
  dayWeek,
  isSelected,
  action,
}) {
  return (
    <Button onPress={action}>
      <Container selected={isSelected}>
        {isToday && <Indicator />}
        <DayNumber>{dayNumber}</DayNumber>
        <DayWeek>{dayWeek}</DayWeek>
      </Container>
    </Button>
  );
}

DayButton.propTypes = {
  isToday: bool,
  dayNumber: oneOfType([number, string]).isRequired,
  dayWeek: string.isRequired,
  isSelected: bool,
  action: func,
};

DayButton.defaultProps = {
  isToday: bool,
  isSelected: false,
  action: () => {},
};
