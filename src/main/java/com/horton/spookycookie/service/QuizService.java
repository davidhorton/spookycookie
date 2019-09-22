package com.horton.spookycookie.service;

import com.horton.spookycookie.data.QuizRepository;
import com.horton.spookycookie.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author David Horton
 * Date:   9/15/19
 */
@Service
public class QuizService {

    private final static long newIDThreshold = 9000000;
    private final QuizRepository quizRepository;

    @Autowired
    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public AdminQuizInfo getAdminQuiz() {
        final AdminQuizInfo adminQuizInfo = new AdminQuizInfo();
        adminQuizInfo.setQuizzes(quizRepository.findAll());
        return adminQuizInfo;
    }

    public Quiz getCurrentQuiz() {
        return quizRepository.findByCurrent(true).get(0);
    }

    public AdminQuizInfo saveQuizzes(final AdminQuizInfo adminQuizInfo) {
        final List<Quiz> quizzes = new ArrayList<>();
        final Map<Long, Question> newQuestionsBeforeSave = new HashMap<>();
        for(Quiz quiz : adminQuizInfo.getQuizzes()) {
            for(Question question : quiz.getQuestions()) {
                question.setQuiz(quiz);
                if(question.getQuestionID() > newIDThreshold) {
                    newQuestionsBeforeSave.put(question.getQuestionID(), question);
                    question.setQuestionID(null);
                }
            }

            for(int i = 0; i < quiz.getTeams().size(); i++) {
                final Team team = quiz.getTeams().get(i);
                team.setQuiz(quiz);
                team.setNumber(i + 1);
                if(team.getTeamID() > newIDThreshold) {
                    team.setTeamID(null);
                }

                for(int j = 0; j < team.getTeamQuestionXRefs().size(); j++) {
                    TeamQuestionXRef teamQuestion = team.getTeamQuestionXRefs().get(j);
                    teamQuestion.setTeam(team);
                    teamQuestion.setTeamQuestionOrder(j + 1);
                    if(teamQuestion.getTeamQuestionID() > newIDThreshold) {
                        teamQuestion.setTeamQuestionID(null);
                    }
                }
            }

            quizzes.add(quizRepository.save(quiz));
        }

        final List<Quiz> quizzesAfterFixingNewQuestions = new ArrayList<>();
        for(Quiz quiz : quizzes) {
            for(Team team : quiz.getTeams()) {
                for(TeamQuestionXRef teamQuestion : team.getTeamQuestionXRefs()) {
                    if(teamQuestion.getQuestionID() >= newIDThreshold) {
                        final Question questionBeforeSave = newQuestionsBeforeSave.get(teamQuestion.getQuestionID());
                        if(questionBeforeSave == null) {
                            teamQuestion.setQuestionID(0L);
                        }
                        else {
                            final Question questionAfterSave = quiz.getQuestions().stream().filter(o -> o.equals(questionBeforeSave)).findFirst().orElse(null);
                            if(questionAfterSave == null) {
                                teamQuestion.setQuestionID(0L);
                            }
                            else {
                                teamQuestion.setQuestionID(questionAfterSave.getQuestionID());
                            }
                        }
                    }
                }
            }
            quizzesAfterFixingNewQuestions.add(quizRepository.save(quiz));
        }

        final AdminQuizInfo saved = new AdminQuizInfo();
        saved.setQuizzes(quizzesAfterFixingNewQuestions);
        return saved;
    }
}
