import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  parseISO,
  formatDistance,
} from 'date-fns';
import en from 'date-fns/locale/en-US';
import pt from 'date-fns/locale/pt-BR';
import i18n from 'i18n-js';

function getCurrentLanguage() {
  if (i18n.locale === 'pt_BR') {
    return pt;
  }
  return en;
}

function getFormmatedDate(date) {
  return format(date, "yyyy'-'MM'-'ee", { locale: getCurrentLanguage() });
}

function getHourRange(firstDate, secondDate) {
  return `${formatDistance(firstDate, secondDate, {
    locale: getCurrentLanguage(),
    includeSeconds: true,
  })} de intervalo`;
}

function getFormatDateAndTime(date, time) {
  const dateSplitted = date.split('-');
  const timeSplitted = time.split(':');
  return new Date(
    dateSplitted[0],
    dateSplitted[1],
    dateSplitted[2],
    timeSplitted[0],
    timeSplitted[1],
    0
  );
}

export function useHour(date) {
  return format(date, "HH':'mm", { locale: getCurrentLanguage() });
}

export function useFormattedWorkDayAndIntervals(workDay) {
  const formattedDates = workDay.map(el =>
    getFormatDateAndTime(el.date, el.time)
  );
  const intervals = [];
  const len = Object.keys(formattedDates).length;
  for (let i = 0; i < len; i++) {
    if (i % 2 !== 0 && i < len - 1) {
      intervals.push(getHourRange(formattedDates[i], formattedDates[i + 1]));
    }
  }

  return { formattedDates, intervals };
}

export function useIsToday(day) {
  return getFormmatedDate(day) === getFormmatedDate(new Date());
}

export function useFormattedDate(date) {
  return getFormmatedDate(date);
}

export function useDayNumber(day) {
  return format(day, 'dd', { locale: getCurrentLanguage() });
}

export function useNameOfDay(day) {
  return format(day, 'eee', { locale: getCurrentLanguage() });
}

export function useCurrentMonthAndYear() {
  const currentDate = new Date();
  const date = parseISO(currentDate.toISOString());
  const formattedDate = format(date, 'MMMM yyyy', {
    locale: getCurrentLanguage(),
  });
  return formattedDate;
}

export function useDaysOfTheCurrentWeek() {
  const currentDate = new Date();
  const firstDayOfTheWeek = startOfWeek(currentDate);
  const lastDayOfTheWeek = endOfWeek(currentDate);
  return eachDayOfInterval({
    start: firstDayOfTheWeek,
    end: lastDayOfTheWeek,
  });
}
