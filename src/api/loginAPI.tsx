import axios from 'utils/request'
import { encrypt } from 'utils/rsaEncrypt'

interface Result {
  success: boolean
  message: string
  data: any
}

export function login(
  userName: string,
  password: string,
  vcode: string,
  uuid: string
) {
  return axios.post<Result>('auth/login', {
    userName,
    password: encrypt(password),
    vcode,
    uuid
  })
}

// export interface CodeImg {
//   img: string
//   uuid: string
// }

export function getCodeImg() {
  const url = 'auth/code'
  return axios.get<Result>(url)
}

export function logout() {
  return axios.post<Result>('auth/logout')
}
