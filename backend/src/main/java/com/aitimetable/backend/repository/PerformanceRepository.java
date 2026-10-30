package com.aitimetable.backend.repository;

import com.aitimetable.backend.model.Performance;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PerformanceRepository
                extends JpaRepository<Performance, Long> {

        List<Performance> findByStudentId(Long studentId);

        List<Performance> findBySubjectIdOrderByDateDescIdDesc(
                        Long subjectId);

        List<Performance> findByStudentIdAndSubjectId(
                        Long studentId,
                        Long subjectId);
}