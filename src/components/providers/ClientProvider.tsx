'use client';

import { App, ConfigProvider, ThemeConfig } from 'antd';
import enUS from 'antd/locale/en_US';
import zhTW from 'antd/locale/zh_TW';
import 'dayjs/locale/zh-tw';
import { useLocale } from 'next-intl';

function ClientProvider({ children }: RootProvider) {
  const locale = useLocale();
  const localeValue = locale === 'zh-TW' ? zhTW : enUS;

  const config: ThemeConfig = {
    token: {
      colorPrimary: '#ffcb48',
      colorInfo: '#ffcb48',
      colorTextBase: '#434343',
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    },
    components: {
      Menu: {
        subMenuItemBg: '#FFCB4810',
        itemHoverBg: '#FFF4C2',
        itemSelectedBg: '#FFF4C2',
        itemSelectedColor: '#D9A432',
        itemActiveBg: '#FFE999',
      },
      Table: {
        headerBg: '#ffde88',
        headerColor: '#8c5d12',
        borderColor: '#fff4c2',
        fixedHeaderSortActiveBg: '#fff4c2',
        headerSplitColor: '#ffe999',
        rowHoverBg: '#fffdf050',
        stickyScrollBarBg: '#fffdf0',
        bodySortBg: '#fffdf050',
        headerSortHoverBg: '#ffe999',
        headerSortActiveBg: '#ffcb48',
        footerBg: '#fff4c2',
        footerColor: '#D9A432',
      },
      Select: {
        colorFillSecondary: '#fff4c2',
      },
      Calendar: {
        controlItemBgHover: '#fffdf050',
        colorSplit: '#ffe999',
        colorText: '#434343',
        colorTextHeading: '#434343',
      },
      DatePicker: {
        cellHoverBg: '#fffdf0',
      },
      Dropdown: {
        controlItemBgHover: '#fffdf0',
      },
      Breadcrumb: {
        linkHoverColor: '#00000030',
      },
      Tree: {
        titleHeight: 30,
      },
      Modal: {
        titleLineHeight: 3,
        titleFontSize: 18,
      },
    },
  };

  return (
    <ConfigProvider theme={config} locale={localeValue}>
      <App>{children}</App>
    </ConfigProvider>
  );
}

export default ClientProvider;
