package com.aitimetable.backend.ai;

import com.aitimetable.backend.model.Performance;
import com.aitimetable.backend.model.Subject;
import com.aitimetable.backend.repository.PerformanceRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiScoringService {

        private final PerformanceRepository performanceRepository;

        public AiScoringService(
                        PerformanceRepository performanceRepository) {
                this.performanceRepository = performanceRepository;
        }

        public AiScoreResult calculateScore(Subject subject) {

                // =========================
                // 1. SUBJECT FACTORS
                // =========================

                double difficultyScore = subject.getDifficulty() / 5.0;

                double priorityScore = subject.getPriority() / 5.0;

                double previousWeakness = (100.0 - subject.getPreviousMarks()) / 100.0;

                // =========================
                // 2. PERFORMANCE HISTORY
                // =========================

                /*
                 * Performance records are returned
                 * with the latest record first.
                 */
                List<Performance> performances = performanceRepository
                                .findBySubjectIdOrderByDateDescIdDesc(
                                                subject.getId());

                double performanceWeakness;

                if (performances.isEmpty()) {

                        /*
                         * No performance history yet.
                         * Use previous marks as the weakness.
                         */
                        performanceWeakness = previousWeakness;

                } else {

                        /*
                         * Latest performance is at index 0.
                         */
                        Performance latest = performances.get(0);

                        double marksWeakness = (100.0 - latest.getTestMarks())
                                        / 100.0;

                        double completionWeakness = (100.0 -
                                        latest.getCompletionPercentage())
                                        / 100.0;

                        /*
                         * Test marks = 70%
                         * Completion = 30%
                         */
                        performanceWeakness = (marksWeakness * 0.70)
                                        +
                                        (completionWeakness * 0.30);
                }

                // =========================
                // 3. ADAPTIVE AI SCORE
                // =========================

                /*
                 * Difficulty = 30%
                 * Subject priority = 20%
                 * Previous marks = 20%
                 * Latest performance = 30%
                 */
                double score = (difficultyScore * 0.30)
                                +
                                (priorityScore * 0.20)
                                +
                                (previousWeakness * 0.20)
                                +
                                (performanceWeakness * 0.30);

                // Keep score between 0 and 1
                score = Math.max(
                                0.0,
                                Math.min(1.0, score));

                // =========================
                // 4. PRIORITY LEVEL
                // =========================

                String priorityLevel;

                if (score >= 0.75) {

                        priorityLevel = "HIGH";

                } else if (score >= 0.50) {

                        priorityLevel = "MEDIUM";

                } else {

                        priorityLevel = "LOW";
                }

                // =========================
                // 5. STUDY HOURS
                // =========================

                double recommendedStudyHours = calculateStudyHours(score);

                // =========================
                // 6. RETURN RESULT
                // =========================

                String recommendation;

                if (priorityLevel.equals("HIGH")) {

                        recommendation = "This subject needs more attention based on its difficulty, priority, and recent performance.";

                } else if (priorityLevel.equals("MEDIUM")) {

                        recommendation = "Maintain regular study sessions and monitor your performance.";

                } else {

                        recommendation = "Your current performance is good. Continue regular revision to maintain progress.";
                }

                return new AiScoreResult(
                                Math.round(score * 100.0) / 100.0,
                                priorityLevel,
                                recommendedStudyHours,
                                recommendation);
        }

        private double calculateStudyHours(
                        double score) {

                if (score >= 0.75) {

                        return 2.0;
                }

                if (score >= 0.50) {

                        return 1.5;
                }

                return 1.0;
        }
}