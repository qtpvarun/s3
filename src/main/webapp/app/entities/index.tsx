import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Course from './course';
import Student from './student';
import Passport from './passport';
import Review from './review';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/course`} component={Course} />
      <ErrorBoundaryRoute path={`${match.url}/student`} component={Student} />
      <ErrorBoundaryRoute path={`${match.url}/passport`} component={Passport} />
      <ErrorBoundaryRoute path={`${match.url}/review`} component={Review} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
