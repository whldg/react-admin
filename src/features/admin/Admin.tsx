import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'app/rootReducer'
import AppFooter from 'components/Footer'
import { AdminHeader } from './header'
import { AdminSiderbar } from './sidebar'
import Overview from './overview/Overview'
import styles from './admin.module.css'

const AdminPage = ({ userName }: PropsFromRedux) => {
  const { Header, Footer, Sider, Content } = Layout
  //折叠导航栏
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={styles.box}>
      <Layout className={styles.layout}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <AdminSiderbar collapsed={collapsed} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <AdminHeader
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              userName={userName}
            />
          </Header>
          <Content className={styles.content}>
            <Switch>
              <Route path="/home/overview">
                <Overview />
              </Route>
              <Route path="/home/top"></Route>
            </Switch>
          </Content>
          <Footer>
            <AppFooter />
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}

const mapState = (state: RootState) => ({
  userName: state.login.userName
})

const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(AdminPage)
