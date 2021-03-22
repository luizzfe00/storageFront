import { inputFormatter } from './date';

const aDay = 86400000;
const anHour = 3600000;
const aMinute = 60000;
const aSecond = 1000;

export const A_DAY_IN_SECONDS = 86400;

export const numberFormatter = (num: number): string => `0${num}`.slice(-2);

export const deltaDate = (date: Date): string => {
  const delta = new Date().getTime() - date.getTime();

  if (delta >= aDay) {
    const result = (delta / aDay).toFixed(0);
    return `${result} dia${Number(result) === 1 ? '' : 's'}`;
  }

  if (delta >= anHour) {
    const result = (delta / anHour).toFixed(0);
    return `${result} hora${Number(result) === 1 ? '' : 's'}`;
  }

  if (delta >= aMinute) {
    const result = (delta / aMinute).toFixed(0);
    return `${result} minuto${Number(result) === 1 ? '' : 's'}`;
  }

  const result = (delta / aSecond).toFixed(0);
  return `${result} segundo${Number(result) === 1 ? '' : 's'}`;
};

export const formatSeconds = (date: Date): string => {
  const year = date.getFullYear();
  const month = numberFormatter(date.getMonth() + 1);
  const day = numberFormatter(date.getDate());

  const hours = numberFormatter(date.getHours());
  const minutes = numberFormatter(date.getMinutes());
  const seconds = numberFormatter(date.getSeconds());

  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = numberFormatter(date.getMonth() + 1);
  const day = numberFormatter(date.getDate());

  return `${month}/${day}/${year}`;
};

export const formatDateBR = (date: Date): string => {
  const year = date.getFullYear();
  const month = numberFormatter(date.getMonth() + 1);
  const day = numberFormatter(date.getDate());

  return `${day}/${month}/${year}`;
};

export const dayMonth = (date: Date): string => {
  const month = numberFormatter(date.getMonth() + 1);
  const day = numberFormatter(date.getDate());

  return `${day}/${month}`;
};

export const splittedDate = (date: string): string => {
  const [year, month, day] = date.includes('/')
    ? date.split('/')
    : date.split('-');

  const newDate = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
  ).toLocaleDateString();

  return newDate;
};

export const secondsTo = (desiredType: string, seconds: number): number => {
  let result: number = seconds;
  if (desiredType === 'days') {
    result /= 86400;
  } else if (desiredType === 'hours') {
    result = Math.floor(result % A_DAY_IN_SECONDS) / 3600;
  } else if (desiredType === 'minutes') {
    result = Math.floor(result % 3600) / 60;
  } else if (desiredType === 'seconds') {
    result = Math.floor(result % 3600) % 60;
  }
  return Math.floor(result);
};

export const timeFormatter = (time: number): string =>
  ['hours', 'minutes', 'seconds']
    .map((type) => numberFormatter(secondsTo(type, time)))
    .join(':');

export const dateToISO = (date: Date, withTime = true): string =>
  `${date.toISOString().substring(0, 10)}${
    withTime ? `T${date.toTimeString().substring(0, 5)}` : ''
  }`;

export const nowToISO = dateToISO(new Date());

export const dateToDashedFormat = (date: Date): string => {
  const year = date.getFullYear();
  const month = numberFormatter(date.getMonth() + 1);
  const day = numberFormatter(date.getDate());

  const hours = numberFormatter(date.getHours());
  const minutes = numberFormatter(date.getMinutes());

  return `${day}-${month}-${year} - ${hours}H${minutes}`;
};

export const stringDateToISO = (strDate: string): string => {
  const [day, month, year] = strDate.split('/');
  return `${month}-${day}-${year}`;
};

export const inputFormat = (date?: string): string => {
  if (!date) return '##/##/####';
  return inputFormatter(date);
};

export const daysAgo = (date?: string): number => {
  if (date) {
    const difference = new Date().getTime() - new Date(date).getTime();

    return Math.trunc(difference / aDay);
  }

  return -1;
};

export default formatDate;
