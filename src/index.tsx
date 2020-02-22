import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './app/store'
import './global.css'
import 'antd/dist/antd.css'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'

import App from './app/App'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
)
