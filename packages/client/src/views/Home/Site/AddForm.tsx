import React from 'react';
import { Button, Form, Input } from 'antd';
import styles from './index.module.scss';
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  site?: string;
  home?: string;
  name?: string;
};

const AddForm: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 5 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className={styles.AddForm}
  >
    <Form.Item<FieldType>
      label="网站域名"
      name="site"
      rules={[{ required: true }]}
    >
      <Input placeholder="请填入网站域名!" />
    </Form.Item>
    <Form.Item<FieldType>
      label="网站首页"
      name="home"
      rules={[{ required: true }]}
    >
      <Input placeholder="请输入网站首页URL" />
    </Form.Item>
    <Form.Item<FieldType> label="网站名称" name="name">
      <Input placeholder="名称" />
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 15, span: 16 }}>
      <Button type="primary" htmlType="submit">
        确定
      </Button>
      <Button
        style={{
          marginLeft: '8px',
        }}
        type="default"
        htmlType="submit"
      >
        取消
      </Button>
    </Form.Item>
  </Form>
);

export default AddForm;
