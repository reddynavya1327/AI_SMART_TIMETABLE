package com.aitimetable.backend.model;

public class StudentResponse {

    private Long id;
    private String name;
    private String rollNumber;
    private String email;
    private double dailyStudyHours;
    private String careerGoal;

    public StudentResponse() {
    }

    public StudentResponse(
            Long id,
            String name,
            String rollNumber,
            String email,
            double dailyStudyHours,
            String careerGoal
    ) {
        this.id = id;
        this.name = name;
        this.rollNumber = rollNumber;
        this.email = email;
        this.dailyStudyHours = dailyStudyHours;
        this.careerGoal = careerGoal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getDailyStudyHours() {
        return dailyStudyHours;
    }

    public void setDailyStudyHours(double dailyStudyHours) {
        this.dailyStudyHours = dailyStudyHours;
    }

    public String getCareerGoal() {
        return careerGoal;
    }

    public void setCareerGoal(String careerGoal) {
        this.careerGoal = careerGoal;
    }
}