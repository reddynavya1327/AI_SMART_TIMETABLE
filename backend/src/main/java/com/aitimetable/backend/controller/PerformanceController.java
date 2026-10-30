package com.aitimetable.backend.controller;

import com.aitimetable.backend.model.Performance;
import com.aitimetable.backend.service.PerformanceService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/performance")
@CrossOrigin(origins = "http://localhost:5173")
public class PerformanceController {

        private final PerformanceService performanceService;

        public PerformanceController(
                        PerformanceService performanceService) {
                this.performanceService = performanceService;
        }

        // =========================
        // RECORD PERFORMANCE
        // =========================

        @PostMapping("/students/{studentId}/subjects/{subjectId}")
        public ResponseEntity<Performance> recordPerformance(
                        @PathVariable Long studentId,
                        @PathVariable Long subjectId,
                        @RequestBody Performance performance) {

                Performance saved = performanceService.recordPerformance(
                                studentId,
                                subjectId,
                                performance);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(saved);
        }

        // =========================
        // GET STUDENT PERFORMANCE
        // =========================

        @GetMapping("/students/{studentId}")
        public ResponseEntity<List<Performance>> getStudentPerformance(
                        @PathVariable Long studentId) {

                List<Performance> performances = performanceService.getStudentPerformance(
                                studentId);

                return ResponseEntity.ok(
                                performances);
        }

        // =========================
        // GET SUBJECT PERFORMANCE
        // =========================

        @GetMapping("/subjects/{subjectId}")
        public ResponseEntity<List<Performance>> getSubjectPerformance(
                        @PathVariable Long subjectId) {

                List<Performance> performances = performanceService.getSubjectPerformance(
                                subjectId);

                return ResponseEntity.ok(
                                performances);
        }
}