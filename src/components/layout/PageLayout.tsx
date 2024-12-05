import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

function PageLayout({ children }: RootProvider) {
  return (
    <Layout className="relative flex !min-h-screen flex-col bg-gray-10">
      <Content className="relative z-10 flex h-full flex-col pt-[56px]">
        <div className="flex h-full w-full flex-grow">{children}</div>
      </Content>
    </Layout>
  );
}

export default PageLayout;
