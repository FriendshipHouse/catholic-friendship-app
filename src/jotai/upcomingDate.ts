import dayjs from 'dayjs';
import { atom } from 'jotai';

const today = dayjs();
const twoMonthsLater = today.add(2, 'months');

export const upcomingDate = atom<dayjs.Dayjs[]>([today, twoMonthsLater]);
