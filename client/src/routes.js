import React from 'react';
// import { LocaleProvider } from 'antd';
// import enUS from 'antd/es/locale-provider/en_US';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/App';
import HomePage from './containers/HomePage/HomePage';
import ConnectedUsersPage from './containers/UsersPage/UsersPage';
import UpcomingLecture from './containers/UpcomingLecture';
import UnattendedQuestions from './containers/UnattendedQuestions';
import ManageLectures from './containers/ManageLectures';
import ManageQuestions from './containers/ManageQuestions';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Login from './containers/Signin/Login';
import Register from './containers/Signin/Register';

export default (
  <div>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/" component={App}>
      <IndexRoute component={HomePage}/>
      <Route path="lectures" component={UpcomingLecture}/>
      <Route path="questions" component={UnattendedQuestions}/>
      <Route path="lectures/manage" component={ManageLectures}/>
      <Route path="lectures/manage/:lectureId" component={ManageLectures}/>
      <Route path="questions/manage" component={ManageQuestions}/>
      <Route path="questions/manage/:questionId" component={ManageQuestions}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </div>
);
