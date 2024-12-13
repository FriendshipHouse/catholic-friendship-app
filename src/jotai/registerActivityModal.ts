import { atom } from 'jotai';

type RegisterActivityModalParams = {
  open: boolean;
  registerFormValue: RegisterFormValue;
};

export const INITIAL_REGISTER_ACTIVITY_VALUE: RegisterFormValue = {
  categoryId: '',
  eventId: '',
  activityId: '',
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

export const registerActivityModal = atom<RegisterActivityModalParams>({
  open: false,
  registerFormValue: INITIAL_REGISTER_ACTIVITY_VALUE,
});
