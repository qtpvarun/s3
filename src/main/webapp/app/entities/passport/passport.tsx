import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './passport.reducer';
import { IPassport } from 'app/shared/model/passport.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPassportProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Passport extends React.Component<IPassportProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { passportList, match } = this.props;
    return (
      <div>
        <h2 id="passport-heading">
          Passports
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Passport
          </Link>
        </h2>
        <div className="table-responsive">
          {passportList && passportList.length > 0 ? (
            <Table responsive aria-describedby="passport-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Number</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {passportList.map((passport, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${passport.id}`} color="link" size="sm">
                        {passport.id}
                      </Button>
                    </td>
                    <td>{passport.number}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${passport.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${passport.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${passport.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Passports found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ passport }: IRootState) => ({
  passportList: passport.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Passport);
