import * as Sentry from '@sentry/react';
import Breadcrumb from 'antd/lib/breadcrumb';
import Layout from 'antd/lib/layout';
import {createRoot} from 'react-dom/client';
import {SENTRY_DSN} from './config/dotenv';
import PasswordChangeForm from './pages/PasswordChangeForm';

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
  });
}

const {Header, Content, Footer} = Layout;

const div = document.getElementById('root')!;
const root = createRoot(div);

root.render(
  <Layout>
    <Header className="d-flex align-items-center">
      <div className="demo-logo">
        <span className="h3 text-white">Devops</span>
      </div>
    </Header>
    <Content className="mx-4">
      <Breadcrumb className="py-2">
        <Breadcrumb.Item>Devops</Breadcrumb.Item>
        <Breadcrumb.Item>Password</Breadcrumb.Item>
      </Breadcrumb>
      <PasswordChangeForm />
    </Content>
    <Footer className="text-center">
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  </Layout>,
);
