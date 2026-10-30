package com.aitimetable.backend.service;

import com.aitimetable.backend.ai.AiScoreResult;
import com.aitimetable.backend.ai.AiScoringService;
import com.aitimetable.backend.model.Student;
import com.aitimetable.backend.model.Subject;
import com.aitimetable.backend.model.Timetable;
import com.aitimetable.backend.repository.StudentRepository;
import com.aitimetable.backend.repository.SubjectRepository;
import com.aitimetable.backend.repository.TimetableRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class TimetableService {

        private final StudentRepository studentRepository;
        private final SubjectRepository subjectRepository;
        private final TimetableRepository timetableRepository;
        private final AiScoringService aiScoringService;

        public TimetableService(
                        StudentRepository studentRepository,
                        SubjectRepository subjectRepository,
                        TimetableRepository timetableRepository,
                        AiScoringService aiScoringService) {
                this.studentRepository = studentRepository;
                this.subjectRepository = subjectRepository;
                this.timetableRepository = timetableRepository;
                this.aiScoringService = aiScoringService;
        }

        // =========================================================
        // GENERATE AI TIMETABLE
        // =========================================================

        public List<Timetable> generateTimetable(
                        Long studentId) {

                // -----------------------------------------------------
                // 1. Find student
                // -----------------------------------------------------

                Student student = studentRepository.findById(studentId)
                                .orElseThrow(() -> new RuntimeException(
                                                "Student not found"));

                // -----------------------------------------------------
                // 2. Find subjects
                // -----------------------------------------------------

                List<Subject> subjects = subjectRepository.findByStudentId(
                                studentId);

                if (subjects.isEmpty()) {

                        throw new RuntimeException(
                                        "No subjects found for this student");
                }

                // -----------------------------------------------------
                // 3. Remove today's existing timetable
                // -----------------------------------------------------

                LocalDate today = LocalDate.now();

                List<Timetable> existingToday = timetableRepository
                                .findByStudentIdAndDate(
                                                studentId,
                                                today);

                if (!existingToday.isEmpty()) {

                        timetableRepository.deleteAll(
                                        existingToday);
                }

                // -----------------------------------------------------
                // 4. Calculate AI score for every subject
                // -----------------------------------------------------

                subjects.sort(
                                Comparator.comparingDouble(
                                                subject -> -aiScoringService
                                                                .calculateScore(subject)
                                                                .getScore()));

                // -----------------------------------------------------
                // 5. Create timetable
                // -----------------------------------------------------

                List<Timetable> generated = new ArrayList<>();

                LocalTime currentTime = LocalTime.of(18, 0);

                double availableHours = student.getDailyStudyHours();

                // -----------------------------------------------------
                // 6. Allocate study time based on AI score
                // -----------------------------------------------------

                for (Subject subject : subjects) {

                        if (availableHours <= 0) {
                                break;
                        }

                        AiScoreResult result = aiScoringService
                                        .calculateScore(subject);

                        double sessionHours = Math.min(
                                        result.getRecommendedStudyHours(),
                                        availableHours);

                        if (sessionHours <= 0) {
                                continue;
                        }

                        int minutes = (int) Math.round(
                                        sessionHours * 60);

                        LocalTime endTime = currentTime.plusMinutes(
                                        minutes);

                        Timetable timetable = new Timetable(
                                        today,
                                        currentTime,
                                        endTime,
                                        subject.getName(),
                                        "Study",
                                        result.getPriorityLevel(),
                                        result.getScore(),
                                        student);

                        generated.add(
                                        timetable);

                        // 15-minute break
                        currentTime = endTime.plusMinutes(
                                        15);

                        availableHours -= sessionHours;
                }

                // -----------------------------------------------------
                // 7. Save generated timetable
                // -----------------------------------------------------

                return timetableRepository.saveAll(
                                generated);
        }

        // =========================================================
        // GET ALL TIMETABLE
        // =========================================================

        public List<Timetable> getStudentTimetable(
                        Long studentId) {

                return timetableRepository
                                .findByStudentId(
                                                studentId);
        }

        // =========================================================
        // GET TODAY'S TIMETABLE
        // =========================================================

        public List<Timetable> getTodayTimetable(
                        Long studentId) {

                return timetableRepository
                                .findByStudentIdAndDate(
                                                studentId,
                                                LocalDate.now());
        }
}