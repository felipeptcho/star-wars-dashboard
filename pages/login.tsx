import {
  Form, Input, Button, Typography, notification,
} from 'antd';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';

import LOGIN, { LoginInterface, User } from '@/api/schema/mutation/login';

const Login: React.FC = () => {
  const router = useRouter();
  const [login] = useMutation<LoginInterface, User>(LOGIN);

  const handleSubmit = async (values: User) => {
    try {
      const { data } = await login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });

      if (!data) {
        throw new Error('Unexpected response.');
      }

      localStorage.setItem('token', data.login.token);
      router.push('/');
    } catch (e) {
      notification.error({ message: e.message });
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
      <div className="flex flex-col w-2/3 px-14 py-8 shadow-xl rounded-2xl bg-white md:w-1/2 xl:w-1/3">
        <Typography>
          <Typography.Title level={3}>Star Wars</Typography.Title>
          <Typography.Paragraph>Please enter your access data</Typography.Paragraph>
        </Typography>
        <Form<User>
          onFinish={handleSubmit}
          className="mt-8"
        >
          <Form.Item
            label="Username"
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <div className="mt-8 text-right">
            <Form.Item>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
