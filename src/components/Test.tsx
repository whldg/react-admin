import React from 'react'
import { Button,version } from 'antd';
import { connect, ConnectedProps } from 'react-redux' //必须用{}

import Loading from '../features/loading/Loading'
import { showLoading, hideLoading } from '../features/loading/loadingSlice'

import LoginPage from '../features/login/Login'

const Test = ({ showLoading, hideLoading }: PropsFromRedux) => {
  //loading使按钮都不能点击了
  function testLoading() {
    showLoading();
    setTimeout(() => hideLoading(), 2000);
  }

  return (
    <div>
      {/* <Button type="primary" onClick={testLoading}>Button</Button> */}
      {/* <h1>antd version: {version}</h1> */}

      <Loading />
      <LoginPage />
    </div>
  )
}

const connector = connect(null, { showLoading, hideLoading })
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Test)
