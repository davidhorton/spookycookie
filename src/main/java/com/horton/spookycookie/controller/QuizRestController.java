package com.horton.spookycookie.controller;

import com.horton.spookycookie.dto.Quiz;
import com.horton.spookycookie.dto.QuizEvent;
import com.horton.spookycookie.service.QuizEventService;
import com.horton.spookycookie.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author David Horton
 * Date:   5/14/19
 */
@RequestMapping("api/quiz")
@RestController
public class QuizRestController {

    private final QuizService quizService;
    private final QuizEventService quizEventService;

    @Autowired
    public QuizRestController(final QuizService quizService, QuizEventService quizEventService) {
        this.quizService = quizService;
        this.quizEventService = quizEventService;
    }

    @GetMapping("/current")
    public Quiz getCurrentQuiz() {
        return quizService.getCurrentQuiz();
    }

    @PostMapping("/event")
    public QuizEvent registerQuizEvent(@RequestBody QuizEvent quizEvent) {
        return quizEventService.registerEvent(quizEvent);
    }
}
