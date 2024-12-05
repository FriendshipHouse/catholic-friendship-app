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
