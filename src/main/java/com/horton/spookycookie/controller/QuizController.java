package com.horton.spookycookie.controller;

import com.horton.spookycookie.dto.Question;
import com.horton.spookycookie.dto.Team;
import com.horton.spookycookie.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author David Horton
 * Date:   5/14/19
 */
@RequestMapping(value = "api/quiz")
@RestController
public class QuizController {

    private final QuestionService questionService;

    @Autowired
    public QuizController(final QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("team/{teamID}/questions")
    public List<Question> getQuestionsForTeam(@PathVariable String teamID) {
        return questionService.getQuestionsForTeam(teamID);
    }

    @GetMapping("/teams")
    public List<Team> getTeams() {
        return questionService.getTeams();
    }
}
