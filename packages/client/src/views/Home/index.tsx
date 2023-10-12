import React, { Suspense, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import styles from './index.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
// import { useSafeState } from 'ahooks';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('网站概况', '/home/overview', <PieChartOutlined />),
  getItem('流量分析', '/home/flow', <DesktopOutlined />),
  getItem('访客分析', 'sub1', <UserOutlined />, [
    getItem('地域分布', '/home/user/area'),
    getItem('系统环境', '/home/user/system'),
    getItem('新老访客', '/home/user/old'),
  ]),
  getItem('访问分析', 'sub2', <TeamOutlined />, [
    getItem('受访页面', '/home/visit/page'),
    getItem('入口页面', '/home/visit/entry'),
  ]),
  getItem('添加站点', '/home/site', <FileOutlined />),
];

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className={styles.Title}>测试demo</div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={(e) => {
            console.log(e);
            navigate(e.key);
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <Suspense fallback={<div>loading</div>}>
            <Outlet />
          </Suspense>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
