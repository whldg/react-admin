import React from 'react'
import { connect, ConnectedProps } from 'react-redux' //必须用{}
import { Spin } from 'antd'
import { RootState } from 'app/rootReducer'
import styles from './loading.module.css'

const Loading = ({ show }: PropsFromRedux) => {
  const loadingStyle = {
    display: show ? 'block' : 'none'
  }

  return (
    <div style={loadingStyle} className={styles['loading-wrapper']}>
      <div className={styles['loading-content']}>
        <Spin size='large' />
      </div>
    </div>
  )
}

const mapState = (state: RootState) => ({
  show: state.loading
})

//要分开
const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(Loading)
