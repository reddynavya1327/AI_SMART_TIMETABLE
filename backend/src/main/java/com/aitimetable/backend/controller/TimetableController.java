package com.aitimetable.backend.controller;

import com.aitimetable.backend.model.Timetable;
import com.aitimetable.backend.service.TimetableService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timetable")
@CrossOrigin(origins = "http://localhost:5173")
public class TimetableController {

    private final TimetableService timetableService;

    public TimetableController(
            TimetableService timetableService
    ) {
        this.timetableService = timetableService;
    }

    @PostMapping("/generate/{studentId}")
    public ResponseEntity<List<Timetable>> generateTimetable(
            @PathVariable Long studentId
    ) {

        return ResponseEntity.ok(
                timetableService.generateTimetable(studentId)
        );
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<List<Timetable>> getTimetable(
            @PathVariable Long studentId
    ) {

        return ResponseEntity.ok(
                timetableService.getStudentTimetable(studentId)
        );
    }

    @GetMapping("/{studentId}/today")
    public ResponseEntity<List<Timetable>> getTodayTimetable(
            @PathVariable Long studentId
    ) {

        return ResponseEntity.ok(
                timetableService.getTodayTimetable(studentId)
        );
    }
}