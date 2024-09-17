import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as AntApp, ConfigProvider, theme } from 'antd';
import { memo } from 'react';
import DefaultLayout from './components/DefaultLayout';
import UserSearchPage from './pages/UserSearchPage';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0, staleTime: 0 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ cssVar: true, algorithm: theme.darkAlgorithm }}>
        <AntApp>
          <DefaultLayout>
            <UserSearchPage />
          </DefaultLayout>
        </AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default memo(App);
