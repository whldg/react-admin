import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  AuditOutlined,
  MenuFoldOutlined,
  ApartmentOutlined,
  ContactsOutlined,
  ProfileOutlined
} from '@ant-design/icons'
import styles from './sidebar.module.css'
import logo from 'assets/images/logo.svg'

const { SubMenu } = Menu

interface Props {
  collapsed: boolean
}

const Sidebar = ({ collapsed }: Props) => {
  return (
    <div className="ant-layout-sider-children">
      <div className={styles.logo}>
        <a href="/">
          <img src={logo} alt="logo" />
          <h1>React-Admin</h1>
        </a>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        style={{ padding: '16px 0', width: '100%' }}
        defaultSelectedKeys={['overview']}
        defaultOpenKeys={['system-manager']}
      >
        <Menu.Item key="overview">
          <Link to="/home/overview">
            <HomeOutlined />
            <span>首页</span>
          </Link>
        </Menu.Item>

        <SubMenu
          key="system-manager"
          title={
            <span>
              <SettingOutlined />
              <span>系统管理</span>
            </span>
          }
        >
          <Menu.Item key="users">
            <Link to="/home/overview">
              <UserOutlined />
              <span>用户管理</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="roles">
            <Link to="/home/users">
              <AuditOutlined />
              <span>角色管理</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="menus">
            <Link to="/home/users">
              <MenuFoldOutlined />
              <span>菜单管理</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="deparments">
            <Link to="/home/users">
              <ApartmentOutlined />
              <span>部门管理</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="jobs">
            <Link to="/home/users">
              <ContactsOutlined />
              <span>岗位管理</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="dicts">
            <Link to="/home/users">
              <ProfileOutlined />
              <span>字典管理</span>
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default Sidebar
