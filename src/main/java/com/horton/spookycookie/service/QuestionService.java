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
        Question q1 = createQuestion(1, "Okay, so that everybody starts at the same time, someone is going to tell you what to type in here. Once you type it in, you're off to the races!",
                "the answer is 'test1'",
                "test1", "testing1");
        Question q2 = createQuestion(2, "At Dick's, looks like there's a clean up on aisle 5...",
                "the answer is 'test2'",
                "test2", "testing2");
        Question q3 = createQuestion(3, "This is a place where you might be able to get a \"hand me down\" answer.",
                "the answer is 'test3'",
                "test3", "testing3");
        Question q4 = createQuestion(4, "If you hurry, you'll probably be able to get \"In-N-Out\" of this place really quickly.",
                "the answer is 'test4'",
                "test4", "testing4");
        Question q5 = createQuestion(5, "Let's not \"Deuel\" at the \"creek\", instead let's just meet at the trailhead for a hike!",
                "the answer is 'test5'",
                "test5", "testing5");
        Question q6 = createQuestion(6, "Man, this answer is going to be too hard... probably best to just flee for the \"Freedom Hills\"",
                "the answer is 'test6'",
                "test6", "testing6");
        Question q7 = createQuestion(7, "If you can get this answer then you'll be right on \"Target\"!",
                "the answer is 'test7'",
                "test7", "testing7");
        Question q8 = createQuestion(8, "Think of yummy salmon, tennis courts, and water hazards...",
                "the answer is 'test8'",
                "test8", "testing8");
        Question q9 = createQuestion(9, "Now hurry, go back to the church and type in what you see on the white board!",
                "the answer is 'test9'",
                "test9", "testing9");


        return Arrays.asList(q1, q2, q3, q4, q5, q6, q7, q8, q9);
    }

    private Question createQuestion(int number, String text, String hint, String... answers) {
        Question q = new Question();
        q.setQuestionText(text);
        q.setAnswers(Arrays.asList(answers));
        q.setHint(hint);
        q.setNumber(number);
        return q;
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
