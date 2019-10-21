import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICourse } from 'app/shared/model/course.model';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { IStudent } from 'app/shared/model/student.model';
import { getEntities as getStudents } from 'app/entities/student/student.reducer';
import { getEntity, updateEntity, createEntity, reset } from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReviewUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IReviewUpdateState {
  isNew: boolean;
  courseId: string;
  studentId: string;
}

export class ReviewUpdate extends React.Component<IReviewUpdateProps, IReviewUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      courseId: '0',
      studentId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCourses();
    this.props.getStudents();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { reviewEntity } = this.props;
      const entity = {
        ...reviewEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/review');
  };

  render() {
    const { reviewEntity, courses, students, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="s3App.review.home.createOrEditLabel">Create or edit a Review</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : reviewEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="review-id">ID</Label>
                    <AvInput id="review-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="ratingLabel" for="review-rating">
                    Rating
                  </Label>
                  <AvField id="review-rating" type="string" className="form-control" name="rating" />
                </AvGroup>
                <AvGroup>
                  <Label id="subjectLabel" for="review-subject">
                    Subject
                  </Label>
                  <AvField id="review-subject" type="text" name="subject" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="review-description">
                    Description
                  </Label>
                  <AvField id="review-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label for="review-course">Course</Label>
                  <AvInput id="review-course" type="select" className="form-control" name="course.id">
                    <option value="" key="0" />
                    {courses
                      ? courses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="review-student">Student</Label>
                  <AvInput id="review-student" type="select" className="form-control" name="student.id">
                    <option value="" key="0" />
                    {students
                      ? students.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/review" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  courses: storeState.course.entities,
  students: storeState.student.entities,
  reviewEntity: storeState.review.entity,
  loading: storeState.review.loading,
  updating: storeState.review.updating,
  updateSuccess: storeState.review.updateSuccess
});

const mapDispatchToProps = {
  getCourses,
  getStudents,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewUpdate);
