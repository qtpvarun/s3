import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './passport.reducer';
import { IPassport } from 'app/shared/model/passport.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPassportDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PassportDetail extends React.Component<IPassportDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { passportEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Passport [<b>{passportEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="number">Number</span>
            </dt>
            <dd>{passportEntity.number}</dd>
          </dl>
          <Button tag={Link} to="/entity/passport" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/passport/${passportEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ passport }: IRootState) => ({
  passportEntity: passport.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassportDetail);
