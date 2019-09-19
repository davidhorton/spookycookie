package com.horton.spookycookie.controller;

import com.horton.spookycookie.dto.Quiz;
import com.horton.spookycookie.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author David Horton
 * Date:   5/14/19
 */
@RequestMapping("api/quiz")
@RestController
public class QuizRestController {

    private final QuizService quizService;

    @Autowired
    public QuizRestController(final QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/current")
    public Quiz getCurrentQuiz() {
        return quizService.getCurrentQuiz();
    }
}
