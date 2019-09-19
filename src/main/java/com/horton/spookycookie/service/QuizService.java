package com.horton.spookycookie.service;

import com.horton.spookycookie.dto.AdminQuizInfo;
import com.horton.spookycookie.dto.Question;
import com.horton.spookycookie.dto.Quiz;
import com.horton.spookycookie.dto.Team;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author David Horton
 * Date:   9/15/19
 */
@Service
public class QuizService {

    public AdminQuizInfo getAdminQuiz() {
        List<Quiz> quizzes = new ArrayList<>();
        quizzes.add(createQuiz("2019", true, "All done! You did it!", "Call Amy Bell! 801-867-9246"));
        quizzes.add(createQuiz("2020", false, "All done! Nice job!", "Call Amy Bell! 801-555-4444"));

        AdminQuizInfo adminQuizInfo = new AdminQuizInfo();
        adminQuizInfo.setQuizzes(quizzes);
        return adminQuizInfo;
    }

    public Quiz getCurrentQuiz() {
        return createQuiz("2019", true, "All done! You did it!", "Call Amy Bell! 801-867-9246");
    }

    private Quiz createQuiz(String name, boolean current, String allDoneMessage, String superDuperHint) {
        Quiz quiz = new Quiz();
        quiz.setName(name);
        quiz.setCurrent(current);
        quiz.setAllDoneMessage(allDoneMessage);
        quiz.setSuperDuperHint(superDuperHint);

        Question q1 = createQuestion(true, "q1", "Okay, so that everybody starts at the same time, someone is going to tell you what to type in here. Once you type it in, you're off to the races!",
                "the answer is 'test1'",
                "test1", "testing1", "1", "1", "1");
        Question q2 = createQuestion(false, "q2", "At Dick's, looks like there's a clean up on aisle 5...",
                "the answer is 'test2'",
                "test2", "testing3", "2", "2", "2");
        Question q3 = createQuestion(true, "q3", "This is a place where you might be able to get a \"hand me down\" answer.",
                "the answer is 'test3'",
                "test3", "testing3", "3", "3", "3");
        Question q4 = createQuestion(true, "q4", "If you hurry, you'll probably be able to get \"In-N-Out\" of this place really quickly.",
                "the answer is 'test4'",
                "test4", "testing4", "4", "4", "4");
        Question q5 = createQuestion(true, "q5", "Let's not \"Deuel\" at the \"creek\", instead let's just meet at the trailhead for a hike!",
                "the answer is 'test5'",
                "test5", "testing5", "5", "5", "5");
        Question q6 = createQuestion(true, "q6", "Man, this answer is going to be too hard... probably best to just flee for the \"Freedom Hills\"",
                "the answer is 'test6'",
                "test6", "testing6", "6", "6", "6");
        Question q7 = createQuestion(true, "q7", "If you can get this answer then you'll be right on \"Target\"!",
                "the answer is 'test7'",
                "test7", "testing7", "7", "7", "7");
        Question q8 = createQuestion(true, "q8", "Think of yummy salmon, tennis courts, and water hazards...",
                "the answer is 'test8'",
                "test8", "testing8", "8", "8", "8");
        Question q9 = createQuestion(true, "q9", "Now hurry, go back to the church and type in what you see on the white board!",
                "the answer is 'test9'",
                "test9", "testing9", "9", "9", "9");

        quiz.setQuestions(Arrays.asList(q1, q2, q3, q4, q5, q6, q7, q8, q9));

        quiz.setTeams(Arrays.asList(
                createTeam("team1", 1, "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"),
                createTeam("team2", 2, "q1", "q4", "q3", "q2", "q5", "q6", "q7", "q8", "q9"),
                createTeam("team3", 3, "q1", "q7", "q3", "q4", "q5", "q6", "q3", "q8", "q9"),
                createTeam("team4", 4, "q1", "q2", "q5", "q6", "q7", "q8", "q9"),
                createTeam("team5", 5, "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"),
                createTeam("team6", 6, "q1", "q9", "q3", "q4", "q5", "q6", "q8", "q7", "q2")
        ));
        return quiz;
    }

    private Question createQuestion(boolean enabled, String id, String text, String hint, String answer1, String answer2, String answer3, String answer4, String answer5) {
        Question question = new Question();
        question.setId(id);
        question.setEnabled(enabled);
        question.setQuestionText(text);
        question.setAnswer1(answer1);
        question.setAnswer2(answer2);
        question.setAnswer3(answer3);
        question.setAnswer4(answer4);
        question.setAnswer5(answer5);

        question.setHint(hint);
        return question;
    }

    private Team createTeam(String id, int number, String... questionIDs) {
        Team team = new Team();
        team.setId(id);
        team.setNumber(number);
        team.setQuestionIds(Arrays.asList(questionIDs));
        return team;
    }
}
