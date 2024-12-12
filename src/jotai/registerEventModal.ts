import { atom } from 'jotai';

type RegisterEventModalParams = {
  open: boolean;
  registerFormValue: RegisterFormValue<string[]>;
};

export const INITIAL_REGISTER_EVENT_VALUE: RegisterFormValue<string[]> = {
  categoryId: '',
  eventId: '',
  activityId: [],
  fullName: '',
  email: '',
  birthday: '',
  id: '',
  phone: '',
  lineId: '',
  parish: '',
  sharePicture: 'yes',
  knowInfo: [],
  beenHere: 'yes',
  submissionTime: '',
};

export const registerEventModal = atom<RegisterEventModalParams>({
  open: false,
  registerFormValue: INITIAL_REGISTER_EVENT_VALUE,
});
