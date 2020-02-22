import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    //这种方式不行
    // showLoading(state) {
    //     state= true;
    // },
    showLoading: () => true,
    hideLoading: () => false
  }
})

export const { showLoading, hideLoading } = loadingSlice.actions

export default loadingSlice.reducer
