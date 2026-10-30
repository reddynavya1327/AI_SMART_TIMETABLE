package com.aitimetable.backend.repository;

import com.aitimetable.backend.model.Timetable;
import com.aitimetable.backend.model.Student;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TimetableRepository
                extends JpaRepository<Timetable, Long> {

        List<Timetable> findByStudent(Student student);

        List<Timetable> findByStudentId(Long studentId);

        List<Timetable> findByStudentIdAndDate(
                        Long studentId,
                        LocalDate date);

        void deleteByStudentId(Long studentId);
}