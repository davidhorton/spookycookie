package com.horton.spookycookie.service;

import com.horton.spookycookie.dto.Question;
import com.horton.spookycookie.dto.Team;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
 * @author David Horton
 * Date:   9/15/19
 */
@Service
public class QuestionService {

    public List<Question> getQuestionsForTeam(String teamID) {
        Question q1 = new Question();
        q1.setQuestionText("This is the question test for question 1");
        q1.setAnswers(Arrays.asList("test1", "testing1"));

        Question q2 = new Question();
        q2.setQuestionText("This is the question test for question 2");
        q2.setAnswers(Arrays.asList("test2", "testing2"));

        return Arrays.asList(q1, q2);
    }

    public List<Team> getTeams() {
        Team t1 = new Team();
        t1.setId("team1");
        t1.setNumber(1);

        Team t2 = new Team();
        t2.setId("team2");
        t2.setNumber(2);

        return Arrays.asList(t1, t2);
    }
}
