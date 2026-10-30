package com.aitimetable.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "performances")
public class Performance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private double studyHours;

    private double testMarks;

    private int completionPercentage;

    private String notes;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    public Performance() {
    }

    public Performance(
            LocalDate date,
            double studyHours,
            double testMarks,
            int completionPercentage,
            String notes,
            Student student,
            Subject subject
    ) {
        this.date = date;
        this.studyHours = studyHours;
        this.testMarks = testMarks;
        this.completionPercentage = completionPercentage;
        this.notes = notes;
        this.student = student;
        this.subject = subject;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public double getStudyHours() {
        return studyHours;
    }

    public void setStudyHours(double studyHours) {
        this.studyHours = studyHours;
    }

    public double getTestMarks() {
        return testMarks;
    }

    public void setTestMarks(double testMarks) {
        this.testMarks = testMarks;
    }

    public int getCompletionPercentage() {
        return completionPercentage;
    }

    public void setCompletionPercentage(int completionPercentage) {
        this.completionPercentage = completionPercentage;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
}