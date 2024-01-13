import {SmileOutlined, WarningOutlined} from '@ant-design/icons';
import {captureException} from '@sentry/react';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import notification from 'antd/lib/notification';
import Spin from 'antd/lib/spin';
import type {AxiosError} from 'axios';
import type {FC} from 'react';
import React from 'react';
import {finalize} from 'rxjs';
import {passwordRepository} from 'src/repositories/password-repository';

interface PasswordChangeForm {
  username: string;

  password: string;

  newPassword: string;

  confirmPassword: string;
}

const PasswordChangeForm: FC = () => {
  const [form] = Form.useForm<PasswordChangeForm>();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();

  const onFinish = React.useCallback(
    async (values: PasswordChangeForm) => {
      const {username, password, newPassword} = values;
      setIsLoading(true);
      passwordRepository
        .changePassword(username, password, newPassword)
        .pipe(finalize(() => setIsLoading(false)))
        .subscribe({
          next: () => {
            api.open({
              message: 'Đổi mật khẩu thành công',
              description: 'Mật khẩu của bạn đã được thay đổi thành công',
              icon: <SmileOutlined className="success" />,
            });
          },
          error: (error: AxiosError) => {
            captureException(error);
            api.open({
              message: 'Đổi mật khẩu không thành công',
              description: error?.response?.data?.toString(),
              icon: <WarningOutlined className="error" />,
            });
            return false;
          },
        });
      // You can handle the password change logic here
    },
    [api],
  );

  return (
    <div className="container py-4">
      {contextHolder}
      <Spin spinning={isLoading} tip="Changing password">
        <ol>
          <li>
            Satisfying the Password Complexity Requirements for Windows Server
            2019
          </li>
          <li>Minimum 8 characters.</li>
          <li>Not containing any characters from the username.</li>
          <li>
            Using at least three of the following four categories: lowercase,
            uppercase, numeric characters and symbols.
          </li>
        </ol>
        <Form
          name="password_change"
          form={form}
          onFinish={onFinish}
          layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: 'Please input your username',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Current Password"
            rules={[
              {
                required: true,
                message: 'Please input your current password!',
              },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              {
                required: true,
                message: 'Please input your new password!',
              },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your new password!',
              },
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default PasswordChangeForm;
