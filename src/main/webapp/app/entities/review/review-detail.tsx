import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReviewDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ReviewDetail extends React.Component<IReviewDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { reviewEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Review [<b>{reviewEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="rating">Rating</span>
            </dt>
            <dd>{reviewEntity.rating}</dd>
            <dt>
              <span id="subject">Subject</span>
            </dt>
            <dd>{reviewEntity.subject}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{reviewEntity.description}</dd>
            <dt>Course</dt>
            <dd>{reviewEntity.course ? reviewEntity.course.id : ''}</dd>
            <dt>Student</dt>
            <dd>{reviewEntity.student ? reviewEntity.student.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/review" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/review/${reviewEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ review }: IRootState) => ({
  reviewEntity: review.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewDetail);
