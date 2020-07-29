import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Enrollments from '../pages/Enrollments';
import Students from '../pages/Students';
import Groups from '../pages/Groups';
import Competitions from '../pages/Competitions';
import Spectacles from '../pages/Spectacles';
import Directors from '../pages/Directors';
import Register from '../pages/Register';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/enrollments" component={Enrollments} isPrivate />
    <Route path="/students" component={Students} isPrivate />
    <Route path="/groups" component={Groups} isPrivate />
    <Route path="/competitions" component={Competitions} isPrivate />
    <Route path="/spectacles" component={Spectacles} isPrivate />
    <Route path="/directors" component={Directors} isPrivate />
    <Route path="/register" component={Register} isPrivate />
  </Switch>
);

export default Routes;
