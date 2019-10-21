package com.jgd.sms.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;



@Entity
@Table(name = "course")
public class Course extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "course")
    private Set<Review> reviews = new HashSet<>();

    @ManyToMany(mappedBy = "courses")
    @JsonIgnore
    private Set<Student> students = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Course name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Course description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public Course reviews(Set<Review> reviews) {
        this.reviews = reviews;
        return this;
    }

    public Course addReview(Review review) {
        this.reviews.add(review);
        review.setCourse(this);
        return this;
    }

    public Course removeReview(Review review) {
        this.reviews.remove(review);
        review.setCourse(null);
        return this;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public Course students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public Course addStudent(Student student) {
        this.students.add(student);
        student.getCourses().add(this);
        return this;
    }

    public Course removeStudent(Student student) {
        this.students.remove(student);
        student.getCourses().remove(this);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Course)) {
            return false;
        }
        return id != null && id.equals(((Course) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Course{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }

}
