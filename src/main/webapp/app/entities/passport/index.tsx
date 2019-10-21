import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Passport from './passport';
import PassportDetail from './passport-detail';
import PassportUpdate from './passport-update';
import PassportDeleteDialog from './passport-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PassportUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PassportUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PassportDetail} />
      <ErrorBoundaryRoute path={match.url} component={Passport} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PassportDeleteDialog} />
  </>
);

export default Routes;
