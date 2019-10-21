package com.jgd.sms.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Review.
 */
@Entity
@Table(name = "review")
public class Review implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "subject")
    private String subject;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties("reviews")
    private Course course;

    @ManyToOne
    @JsonIgnoreProperties("reviews")
    private Student student;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRating() {
        return rating;
    }

    public Review rating(Integer rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getSubject() {
        return subject;
    }

    public Review subject(String subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public Review description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Course getCourse() {
        return course;
    }

    public Review course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Student getStudent() {
        return student;
    }

    public Review student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Review)) {
            return false;
        }
        return id != null && id.equals(((Review) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Review{" +
            "id=" + getId() +
            ", rating=" + getRating() +
            ", subject='" + getSubject() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
