import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { logout } from 'api/loginAPI'
import { showLoading, hideLoading } from 'features/loading/loadingSlice'
import { message } from 'antd'

export interface LoginInfo {
  logined: boolean
  userName: string
  admin: boolean
  token?: string
}

const initialState: LoginInfo = {
  logined: false,
  userName: '',
  admin: false,
  token: undefined
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logined(state, action) {
      state.logined = true
      state.userName = action.payload.userName
      state.admin = action.payload.admin
      state.token = action.payload.token
    },
    logouted(state) {
      Object.assign(state ,initialState)
    }
  }
})

//注销
export const fetchLogout = (history: any): AppThunk => async dispatch => {
  dispatch(showLoading()) //必须放到块中
  logout()
    .then(response => {
      const result: any = response.data
      if (result.success) {
        dispatch(logouted())
        history.push('/login')
      } else {
        message.error('注销接口调用错误')
      }
    })
    .catch(() => {})
  dispatch(hideLoading())
}

export const { logined, logouted } = loginSlice.actions
export default loginSlice.reducer
