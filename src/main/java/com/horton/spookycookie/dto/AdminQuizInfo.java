package com.horton.spookycookie.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * @author David Horton
 * Date:   9/18/19
 */
public class AdminQuizInfo {

    private List<Quiz> quizzes = new ArrayList<>();

    public List<Quiz> getQuizzes() {
        return quizzes;
    }

    public void setQuizzes(List<Quiz> quizzes) {
        this.quizzes = quizzes;
    }
}
