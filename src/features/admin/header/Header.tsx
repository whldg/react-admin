import React from 'react'
import { useHistory } from 'react-router-dom'
import {  useDispatch } from 'react-redux'
import {fetchLogout} from 'features/login/loginSlice'
import { Dropdown, Menu,Modal } from 'antd'
import {
  SettingOutlined,
  PoweroffOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
// import * as LocalStorage from '../../util/localstorage';
import styles from './header.module.css'

const getMenu = (onLogout:any)=>(
  <Menu>
    <Menu.Item key="1">
      <Link to="/home/setting">
        <SettingOutlined />
        偏好设置
      </Link>
    </Menu.Item>
    <Menu.Item key="2" onClick={onLogout}>
      <PoweroffOutlined />
      退出登录
    </Menu.Item>
  </Menu>
)

interface Props {
  userName: string
  collapsed: boolean
  setCollapsed: (val: boolean) => void
}

const Header = ({ collapsed, setCollapsed, userName }: Props) => {
  const history=useHistory();
  const dispatch = useDispatch()

  function logout(){
    const { confirm } = Modal;
    confirm({
      title: '真的想注销吗?',
      content: '注销后要使用系统需重新登录',
      onOk() {
        dispatch(fetchLogout(history))
      }
    });
  //  onLogout(history)
  }

  return (
    <div className={styles['header-wrapper']}>
      <span
        className={styles['header-collapsed']}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </span>
      <div className={styles['header-user-info']}>
        <Dropdown overlay={getMenu(logout)} placement="bottomRight">
          <span className={styles['header-dropdown-link']}>
            <UserOutlined />&nbsp;
            {userName}
            <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header
