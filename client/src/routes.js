import React from 'react';
// import { LocaleProvider } from 'antd';
// import enUS from 'antd/es/locale-provider/en_US';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/App';
import HomePage from './containers/HomePage/HomePage';
import ConnectedUsersPage from './containers/UsersPage/UsersPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Login from './containers/Signin/Login';
import Register from './containers/Signin/Register';

export default (
  <div>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/" component={App}>
      <IndexRoute component={HomePage}/>
      <Route path="users" component={ConnectedUsersPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </div>
);
