package com.aitimetable.backend.service;

import com.aitimetable.backend.model.Student;
import com.aitimetable.backend.repository.StudentRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentService(
            StudentRepository studentRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Student registerStudent(Student student) {

        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new RuntimeException(
                    "Email already registered"
            );
        }

        if (studentRepository.existsByRollNumber(
                student.getRollNumber()
        )) {
            throw new RuntimeException(
                    "Roll number already registered"
            );
        }

        String hashedPassword =
                passwordEncoder.encode(
                        student.getPassword()
                );

        student.setPassword(hashedPassword);

        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {

        return studentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Student not found"
                        )
                );
    }

    public Student login(
            String email,
            String password
    ) {

        Student student =
                studentRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password"
                                )
                        );

        if (!passwordEncoder.matches(
                password,
                student.getPassword()
        )) {
            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        return student;
    }
}