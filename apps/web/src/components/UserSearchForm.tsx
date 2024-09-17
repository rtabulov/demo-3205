import { Button, Col, Form, Input, Row } from 'antd';
import { memo } from 'react';

export interface UserSearchFormValues {
  email: string;
  number?: string;
}

export interface UserSearchFormProps {
  onFinish?: (values: UserSearchFormValues) => void;
  loading?: boolean;
}

function UserSearchForm({ onFinish }: UserSearchFormProps) {
  return (
    <Row>
      <Col span={24}>
        <Form<UserSearchFormValues> onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={24} xl={10}>
              <Form.Item
                name="email"
                label="Email"
                required
                rules={[{ required: true }]}
              >
                <Input placeholder="Search" />
              </Form.Item>
            </Col>

            <Col span={24} xl={10}>
              <Form.Item name="number" label="Number">
                <Input placeholder="Search" />
              </Form.Item>
            </Col>

            <Col flex="1">
              <Button htmlType="submit" type="primary" block>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default memo(UserSearchForm);
