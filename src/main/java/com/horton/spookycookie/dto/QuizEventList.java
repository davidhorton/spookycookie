package com.horton.spookycookie.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * @author David Horton
 * Date:   3/2/20
 */
public class QuizEventList {
    private List<QuizEvent> quizEvents = new ArrayList<>();

    public List<QuizEvent> getQuizEvents() {
        return quizEvents;
    }

    public void setQuizEvents(List<QuizEvent> quizEvents) {
        this.quizEvents = quizEvents;
    }
}
