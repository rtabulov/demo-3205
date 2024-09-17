import { Card, Flex, Layout, Typography } from 'antd';
import { memo } from 'react';

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header>
        <Flex align="center" justify="center" style={{ height: '100%' }}>
          <Typography.Title
            style={{ fontSize: 'var(--ant-font-size-xl)', margin: 0 }}
          >
            Demo app for 3205
          </Typography.Title>
        </Flex>
      </Layout.Header>

      <Layout.Content style={{ padding: 24 }}>
        <Card style={{ maxWidth: 800, marginInline: 'auto' }}>{children}</Card>
      </Layout.Content>
    </Layout>
  );
}

export default memo(DefaultLayout);
