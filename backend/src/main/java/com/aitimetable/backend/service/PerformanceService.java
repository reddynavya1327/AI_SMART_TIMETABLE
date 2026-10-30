package com.aitimetable.backend.service;

import com.aitimetable.backend.model.Performance;
import com.aitimetable.backend.model.Student;
import com.aitimetable.backend.model.Subject;
import com.aitimetable.backend.repository.PerformanceRepository;
import com.aitimetable.backend.repository.StudentRepository;
import com.aitimetable.backend.repository.SubjectRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PerformanceService {

        private final PerformanceRepository performanceRepository;
        private final StudentRepository studentRepository;
        private final SubjectRepository subjectRepository;

        public PerformanceService(
                        PerformanceRepository performanceRepository,
                        StudentRepository studentRepository,
                        SubjectRepository subjectRepository) {
                this.performanceRepository = performanceRepository;
                this.studentRepository = studentRepository;
                this.subjectRepository = subjectRepository;
        }

        // =========================
        // RECORD PERFORMANCE
        // =========================

        public Performance recordPerformance(
                        Long studentId,
                        Long subjectId,
                        Performance performance) {

                Student student = studentRepository.findById(studentId)
                                .orElseThrow(() -> new RuntimeException(
                                                "Student not found"));

                Subject subject = subjectRepository.findById(subjectId)
                                .orElseThrow(() -> new RuntimeException(
                                                "Subject not found"));

                performance.setStudent(student);
                performance.setSubject(subject);

                if (performance.getDate() == null) {
                        performance.setDate(LocalDate.now());
                }

                return performanceRepository.save(
                                performance);
        }

        // =========================
        // GET STUDENT PERFORMANCE
        // =========================

        public List<Performance> getStudentPerformance(
                        Long studentId) {

                return performanceRepository
                                .findByStudentId(studentId);
        }

        // =========================
        // GET SUBJECT PERFORMANCE
        // =========================

        public List<Performance> getSubjectPerformance(
                        Long subjectId) {

                return performanceRepository
                                .findBySubjectIdOrderByDateDescIdDesc(
                                                subjectId);
        }
}