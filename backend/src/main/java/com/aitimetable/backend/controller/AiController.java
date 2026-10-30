package com.aitimetable.backend.controller;

import com.aitimetable.backend.ai.AiScoreResult;
import com.aitimetable.backend.ai.AiScoringService;
import com.aitimetable.backend.model.Subject;
import com.aitimetable.backend.service.SubjectService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AiController {

    private final AiScoringService aiScoringService;
    private final SubjectService subjectService;

    public AiController(
            AiScoringService aiScoringService,
            SubjectService subjectService
    ) {
        this.aiScoringService = aiScoringService;
        this.subjectService = subjectService;
    }

    @GetMapping("/subjects/{subjectId}/score")
    public ResponseEntity<AiScoreResult> calculateSubjectScore(
            @PathVariable Long subjectId
    ) {

        Subject subject =
                subjectService.getSubjectById(subjectId);

        AiScoreResult result =
                aiScoringService.calculateScore(subject);

        return ResponseEntity.ok(result);
    }
}