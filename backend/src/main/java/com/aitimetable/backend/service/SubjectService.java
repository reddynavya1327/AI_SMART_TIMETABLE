package com.aitimetable.backend.service;

import com.aitimetable.backend.model.Subject;
import com.aitimetable.backend.model.Student;
import com.aitimetable.backend.repository.SubjectRepository;
import com.aitimetable.backend.repository.StudentRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final StudentRepository studentRepository;

    public SubjectService(
            SubjectRepository subjectRepository,
            StudentRepository studentRepository
    ) {
        this.subjectRepository = subjectRepository;
        this.studentRepository = studentRepository;
    }

    public Subject addSubject(Long studentId, Subject subject) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new RuntimeException("Student not found"));

        subject.setStudent(student);

        return subjectRepository.save(subject);
    }

    public List<Subject> getSubjectsByStudent(Long studentId) {

        return subjectRepository.findByStudentId(studentId);
    }

    public Subject getSubjectById(Long id) {

        return subjectRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Subject not found"));
    }

    public void deleteSubject(Long id) {

        if (!subjectRepository.existsById(id)) {
            throw new RuntimeException("Subject not found");
        }

        subjectRepository.deleteById(id);
    }
}