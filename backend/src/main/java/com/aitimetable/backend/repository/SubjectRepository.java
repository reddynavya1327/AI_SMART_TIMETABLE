package com.aitimetable.backend.repository;

import com.aitimetable.backend.model.Subject;
import com.aitimetable.backend.model.Student;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

    List<Subject> findByStudent(Student student);

    List<Subject> findByStudentId(Long studentId);
}