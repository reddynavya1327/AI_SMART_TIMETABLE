package com.aitimetable.backend.controller;

import com.aitimetable.backend.model.LoginRequest;
import com.aitimetable.backend.model.Student;
import com.aitimetable.backend.model.StudentResponse;
import com.aitimetable.backend.service.StudentService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentService studentService;

    public StudentController(
            StudentService studentService
    ) {
        this.studentService = studentService;
    }


    // =========================================================
    // REGISTER
    // =========================================================

    @PostMapping("/register")
    public ResponseEntity<StudentResponse> registerStudent(
            @RequestBody Student student
    ) {

        Student savedStudent =
                studentService.registerStudent(student);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(toResponse(savedStudent));
    }


    // =========================================================
    // LOGIN
    // =========================================================

    @PostMapping("/login")
    public ResponseEntity<StudentResponse> login(
            @RequestBody LoginRequest request
    ) {

        Student student =
                studentService.login(
                        request.getEmail(),
                        request.getPassword()
                );

        return ResponseEntity.ok(
                toResponse(student)
        );
    }


    // =========================================================
    // GET ALL STUDENTS
    // =========================================================

    @GetMapping
    public ResponseEntity<List<StudentResponse>>
    getAllStudents() {

        List<StudentResponse> students =
                studentService
                        .getAllStudents()
                        .stream()
                        .map(this::toResponse)
                        .toList();

        return ResponseEntity.ok(students);
    }


    // =========================================================
    // GET STUDENT BY ID
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponse>
    getStudentById(
            @PathVariable Long id
    ) {

        Student student =
                studentService.getStudentById(id);

        return ResponseEntity.ok(
                toResponse(student)
        );
    }


    // =========================================================
    // CONVERT STUDENT → RESPONSE
    // =========================================================

    private StudentResponse toResponse(
            Student student
    ) {

        return new StudentResponse(
                student.getId(),
                student.getName(),
                student.getRollNumber(),
                student.getEmail(),
                student.getDailyStudyHours(),
                student.getCareerGoal()
        );
    }
}