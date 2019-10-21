package com.jgd.sms.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Student.
 */
@Entity
@Table(name = "student")
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @OneToOne
    @JoinColumn(unique = true)
    private Passport passport;

    @ManyToMany
    @JoinTable(name = "student_course",
               joinColumns = @JoinColumn(name = "student_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "course_id", referencedColumnName = "id"))
    private Set<Course> courses = new HashSet<>();

    @OneToMany(mappedBy = "student")
    private Set<Review> reviews = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Student firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Student lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Passport getPassport() {
        return passport;
    }

    public Student passport(Passport passport) {
        this.passport = passport;
        return this;
    }

    public void setPassport(Passport passport) {
        this.passport = passport;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public Student courses(Set<Course> courses) {
        this.courses = courses;
        return this;
    }

    public Student addCourse(Course course) {
        this.courses.add(course);
        course.getStudents().add(this);
        return this;
    }

    public Student removeCourse(Course course) {
        this.courses.remove(course);
        course.getStudents().remove(this);
        return this;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public Student reviews(Set<Review> reviews) {
        this.reviews = reviews;
        return this;
    }

    public Student addReview(Review review) {
        this.reviews.add(review);
        review.setStudent(this);
        return this;
    }

    public Student removeReview(Review review) {
        this.reviews.remove(review);
        review.setStudent(null);
        return this;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Student)) {
            return false;
        }
        return id != null && id.equals(((Student) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            "}";
    }
}
