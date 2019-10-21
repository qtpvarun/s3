import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './student.reducer';
import { IStudent } from 'app/shared/model/student.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStudentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Student extends React.Component<IStudentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { studentList, match } = this.props;
    return (
      <div>
        <h2 id="student-heading">
          Students
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Student
          </Link>
        </h2>
        <div className="table-responsive">
          {studentList && studentList.length > 0 ? (
            <Table responsive aria-describedby="student-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Passport</th>
                  <th>Course</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {studentList.map((student, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${student.id}`} color="link" size="sm">
                        {student.id}
                      </Button>
                    </td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.passport ? <Link to={`passport/${student.passport.id}`}>{student.passport.id}</Link> : ''}</td>
                    <td>
                      {student.courses
                        ? student.courses.map((val, j) => (
                            <span key={j}>
                              <Link to={`course/${val.id}`}>{val.id}</Link>
                              {j === student.courses.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${student.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${student.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${student.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Students found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ student }: IRootState) => ({
  studentList: student.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);
