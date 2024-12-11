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
