import { useQuery } from '@tanstack/react-query';
import { Descriptions, List, Space } from 'antd';
import { memo, useState } from 'react';
import UserSearchForm, {
  UserSearchFormValues,
} from '../components/UserSearchForm';
import { trpcClient } from '../trpcClient';

const UserSearchPage = () => {
  const [formValues, setFormValues] = useState<UserSearchFormValues>();

  const { data: searchResult, isFetching } = useQuery({
    queryKey: ['findUser', formValues],
    enabled: !!formValues,
    queryFn: ({ signal }) => trpcClient.findUser.query(formValues!, { signal }),
  });

  return (
    <Space style={{ width: '100%' }} direction="vertical">
      <UserSearchForm onFinish={setFormValues} loading={isFetching} />
      <List
        loading={isFetching}
        dataSource={searchResult}
        renderItem={(record) => (
          <List.Item>
            <Descriptions
              items={[
                { key: 'Email', label: 'Email', children: record.email },
                { key: 'Number', label: 'Number', children: record.number },
              ]}
            />
          </List.Item>
        )}
        rowKey={(record) => record.email + record.number}
      />
    </Space>
  );
};

export default memo(UserSearchPage);
