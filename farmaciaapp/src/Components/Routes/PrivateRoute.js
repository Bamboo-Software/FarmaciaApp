import React, {useContext} from 'react';
import { Route, Redirect, Outlet } from 'react-router-dom';
import {contextoUser} from '../../contexto/contexto';

const PrivateRoute = ({component: Component, ...props}) => {
    const user = useContext(contextoUser);

   // return <Route {...props}>{user.rol=="normal"?<Redirect to="/"/>:<Component/>}</Route>;
  //  return <Route {...props}/>{user.isAuth==true?<Route path="/" element={<Home/>}/>:<Component/>};
};

export default PrivateRoute;