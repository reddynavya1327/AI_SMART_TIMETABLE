package com.aitimetable.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "timetables")
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private LocalTime startTime;

    private LocalTime endTime;

    private String subjectName;

    private String activity;

    private String priorityLevel;

    private double aiScore;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    public Timetable() {
    }

    public Timetable(
            LocalDate date,
            LocalTime startTime,
            LocalTime endTime,
            String subjectName,
            String activity,
            String priorityLevel,
            double aiScore,
            Student student
    ) {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.subjectName = subjectName;
        this.activity = activity;
        this.priorityLevel = priorityLevel;
        this.aiScore = aiScore;
        this.student = student;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public String getActivity() {
        return activity;
    }

    public String getPriorityLevel() {
        return priorityLevel;
    }

    public double getAiScore() {
        return aiScore;
    }

    public Student getStudent() {
        return student;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public void setPriorityLevel(String priorityLevel) {
        this.priorityLevel = priorityLevel;
    }

    public void setAiScore(double aiScore) {
        this.aiScore = aiScore;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}