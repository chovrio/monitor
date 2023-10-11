import { Form, Input, Checkbox, Button, message } from 'antd';
import { useSafeState } from 'ahooks';
import { login, register } from '@api/user';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

const onFinishFailed = (errorInfo: any) => {
  message.error('请输入符合格式的账号密码');
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
export default function Login() {
  const [isLogin, setIsLogin] = useSafeState(true);
  const navigate = useNavigate();
  const setRegister = () => setIsLogin(false);
  const setLogin = () => setIsLogin(true);
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    if (values.remember) {
      localStorage.setItem('username', values.username);
    } else {
      localStorage.removeItem('username');
    }
    if (isLogin) {
      const res = await login(values);
      localStorage.setItem('token', res.result.token);
      navigate('/');
    } else {
      await register(values);
    }
  };
  return (
    <div className={styles.Login}>
      <div className={styles.Container}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={styles.Form}
        >
          <Form.Item<FieldType>
            label="账号"
            name="username"
            rules={[
              { required: true, message: '请输入您的账号!' },
              { max: 10, min: 5, message: '请填入5-10位的账号' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入您的密码!' },
              { min: 5, message: '请输入至少为5位的密码' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
            style={{
              display: isLogin ? 'block' : 'none',
              margin: 0,
            }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              style={{
                display: isLogin ? 'inline-block' : 'none',
              }}
              type="link"
              onClick={setRegister}
            >
              还没账号?注册一个?
            </Button>
            <Button
              style={{
                display: !isLogin ? 'inline-flex' : 'none',
              }}
              type="link"
              onClick={setLogin}
            >
              已有账号去登陆?
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {isLogin ? '登录' : '注册'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
