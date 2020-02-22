import { combineReducers } from '@reduxjs/toolkit'
import loadingReducer from 'features/loading/loadingSlice'
import loginReducer from 'features/login/loginSlice'

const rootReducer = combineReducers({
  loading: loadingReducer,
  login: loginReducer
})

//这种输出是一种模式
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
