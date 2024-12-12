type Locale = 'en-US' | 'zh-TW';

type RootProvider = Readonly<{
  children: React.ReactNode;
}>;

type AdminFormValue = {
  name: string;
  email: string;
  _id: string;
  key?: string;
};

type CategoriesFormValue = {
  name: string;
  image: string;
  remark?: string;
  order: number;
  _id: string;
  key?: string;
};

type EventsFormValue = {
  name: string;
  description?: string;
  categoryId: string;
  order: number;
  _id: string;
  key?: string;
};

type RegisterType = 'google' | 'system';

type ExtraField = 'birthday' | 'id';

type SystemFormInfo = {
  dueDate?: string;
  extraFields?: ExtraField[];
  detail?: string;
  notice?: string;
};

type ActivitiesFormValue = {
  categoryId: string;
  eventId: string;
  name: string;
  date: string | string[];
  time: (string | null)[];
  location: string;
  description: string;
  image: string;
  registerType: RegisterType;
  googleFormLink?: string;
  systemFormInfo?: SystemFormInfo;
  _id: string;
  key?: string;
};

type YesNoType = 'yes' | 'no';

type KnowInfo = 'bulletin' | 'web' | 'lineGroup' | 'friends' | 'apostles' | 'others';

type RegisterFormValue<ActivityId = string> = {
  _id?: string;
  categoryId: string;
  eventId: string;
  activityId: ActivityId;
  fullName: string;
  email: string;
  birthday?: string;
  id?: string;
  phone: string;
  lineId?: string;
  parish: string;
  sharePicture: YesNoType;
  knowInfo: KnowInfo[];
  beenHere: YesNoType;
  submissionTime?: string;
  otherKnowInfo?: string;
};
