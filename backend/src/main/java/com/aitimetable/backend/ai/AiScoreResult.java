package com.aitimetable.backend.ai;

public class AiScoreResult {

    private double score;
    private String priorityLevel;
    private double recommendedStudyHours;
    private String recommendation;

    public AiScoreResult(
            double score,
            String priorityLevel,
            double recommendedStudyHours,
            String recommendation) {
        this.score = score;
        this.priorityLevel = priorityLevel;
        this.recommendedStudyHours = recommendedStudyHours;
        this.recommendation = recommendation;
    }

    public double getScore() {
        return score;
    }

    public String getPriorityLevel() {
        return priorityLevel;
    }

    public double getRecommendedStudyHours() {
        return recommendedStudyHours;
    }

    public String getRecommendation() {
        return recommendation;
    }
}