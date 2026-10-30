package com.aitimetable.backend.controller;

import com.aitimetable.backend.model.Subject;
import com.aitimetable.backend.service.SubjectService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students/{studentId}/subjects")
@CrossOrigin(origins = "http://localhost:5173")
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @PostMapping
    public ResponseEntity<Subject> addSubject(
            @PathVariable Long studentId,
            @RequestBody Subject subject
    ) {

        Subject savedSubject =
                subjectService.addSubject(studentId, subject);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedSubject);
    }

    @GetMapping
    public ResponseEntity<List<Subject>> getStudentSubjects(
            @PathVariable Long studentId
    ) {

        return ResponseEntity.ok(
                subjectService.getSubjectsByStudent(studentId)
        );
    }

    @GetMapping("/{subjectId}")
    public ResponseEntity<Subject> getSubject(
            @PathVariable Long subjectId
    ) {

        return ResponseEntity.ok(
                subjectService.getSubjectById(subjectId)
        );
    }

    @DeleteMapping("/{subjectId}")
    public ResponseEntity<Void> deleteSubject(
            @PathVariable Long subjectId
    ) {

        subjectService.deleteSubject(subjectId);

        return ResponseEntity.noContent().build();
    }
}