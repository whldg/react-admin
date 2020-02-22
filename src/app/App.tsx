import React from 'react'
import { Route, Switch,Redirect } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from './rootReducer'

import Loading from 'features/loading/Loading'
import Login from 'features/login/Login'
import Admin from 'features/admin/Admin'
import Home from 'features/home/Home'

//进行路由认证
function PrivateRoute({ children, logined,...rest }:any) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        logined ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}



const App = ({logined,admin}:PropsFromRedux) => {
  return (
    <>
      <Loading />

      <Switch> 
        <Route path='/login'>
          <Login />
        </Route>
        <PrivateRoute path='/home' logined={logined}>
          {admin?<Admin />:<Home />}
        </PrivateRoute>
        <PrivateRoute exact path='/' logined={logined}>
          {admin?<Admin />:<Home />}
        </PrivateRoute>        
        <PrivateRoute path='/' logined={false}>//强制跳转地址
          <Login />
        </PrivateRoute>        
      </Switch>
    </>
  )
}

const mapState = (state: RootState) => ({
  logined: state.login.logined,
  admin:state.login.admin
})
const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(App)
