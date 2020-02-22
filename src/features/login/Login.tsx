import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, Button, Form, Input, Card, message } from 'antd'
import { UserOutlined, LockOutlined, VerifiedOutlined } from '@ant-design/icons'
import { connect, ConnectedProps } from 'react-redux'
import { showLoading, hideLoading } from 'features/loading/loadingSlice'
import { logined } from 'features/login/loginSlice'
import { getCodeImg } from 'api/loginAPI'
import { login } from 'api/loginAPI'
import Setting from 'settings'
import styles from './login.module.css'

const LoginPage = ({ showLoading, hideLoading, logined }: PropsFromRedux) => {
  //必须在组件中获取
  const history = useHistory()
  const [codeImg, setCodeImg] = useState('')
  const [uuid, setUuid] = useState('')

  const refreshCodeImg = () => {
    getCodeImg()
      .then(response => {
        const result: any = response.data
        if (result.success) {
          setCodeImg(result.data.img)
          setUuid(result.data.uuid)
        } else message.error('验证码获取错误！')
      })
      .catch(() => {})
  }

  //初始化的时候刷新验证码
  useEffect(refreshCodeImg, [])

  //由于基本是内部逻辑，放到组件内部完成
  const onFinish = (values: any) => {
    const { userName, password, verificationCode } = values

    showLoading() //必须放到块中
    login(userName, password, verificationCode, uuid)
      .then(response => {
        hideLoading()

        const data = response.data
        if (data.success) {
          logined(data.data)
          history.push('/home/overview')
        } else {
          message.error(data.message)
          refreshCodeImg()
        }
      })
      .catch(() => {
        // refreshCodeImg() //网络访问失败后，就不要重新申请验证码了
        hideLoading()
      })
  }

  //有校验错误时按下登录按钮
  const onFinishFailed = () => {
    refreshCodeImg()
  }

  return (
    <div className={styles.box}>
      <Card className={styles.content}>
        <Form name="login" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <div className={styles.title}>React-Admin后台管理系统</div>
          <Form.Item
            name="userName"
            rules={[{ required: true, message: '请输入你的用户名!' }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码!' },
              { max: 40, message: '密码长度须小于41' } /* 须考虑RSA加密长度 */
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>
          <Row gutter={16}>
            <Col span={14}>
              <Form.Item
                name="verificationCode"
                rules={[{ required: true, message: '请输入验证码!' }]}
              >
                <Input
                  size="large"
                  prefix={<VerifiedOutlined />}
                  placeholder="验证码"
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <img
                src={codeImg}
                alt="验证码"
                onClick={refreshCodeImg}
                style={{ height: '40px' }}
              />
            </Col>
          </Row>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <div className={styles['footer']}>{Setting.footerText}</div>
    </div>
  )
}

const connector = connect(null, { showLoading, hideLoading, logined })
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(LoginPage)
