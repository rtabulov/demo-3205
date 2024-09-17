import { MaskitoOptions } from '@maskito/core';
import { useMaskito } from '@maskito/react';
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

const maskOptions: MaskitoOptions = {
  mask: [
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ],
};

function UserSearchForm({ onFinish }: UserSearchFormProps) {
  const inputRef = useMaskito({ options: maskOptions });

  return (
    <Row>
      <Col span={24}>
        <Form<UserSearchFormValues> onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={24} md={10}>
              <Form.Item
                name="email"
                label="Email"
                required
                rules={[{ required: true }]}
              >
                <Input placeholder="Search" />
              </Form.Item>
            </Col>

            <Col span={24} md={10} ref={inputRef}>
              <Form.Item name="number" label="Number" trigger="onInput">
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
