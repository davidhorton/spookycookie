package com.horton.spookycookie.controller;

import com.horton.spookycookie.dto.AdminQuizInfo;
import com.horton.spookycookie.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author David Horton
 * Date:   9/18/19
 */
@RequestMapping("api/admin")
@RestController
public class AdminRestController {

    private final QuizService quizService;

    @Autowired
    public AdminRestController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("quiz")
    public AdminQuizInfo getAdminQuiz() {
        return quizService.getAdminQuiz();
    }

    @PostMapping("quizzes")
    public AdminQuizInfo saveQuizzes(@RequestBody final AdminQuizInfo adminQuizInfo) {
        return quizService.saveQuizzes(adminQuizInfo);
    }
}
