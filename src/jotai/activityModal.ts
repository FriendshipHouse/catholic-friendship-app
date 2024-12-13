import { atom } from 'jotai';

type ActivityModalParams = {
  open: boolean;
  activityData: ActivitiesFormValue;
};

export const INITIAL_ACTIVITY_VALUE: ActivitiesFormValue = {
  _id: '',
  date: '',
  name: '',
  time: [null, null],
  location: '',
  image: '',
  categoryId: '',
  eventId: '',
  description: '',
  registerType: 'google',
};

export const activityModal = atom<ActivityModalParams>({
  open: false,
  activityData: INITIAL_ACTIVITY_VALUE,
});
