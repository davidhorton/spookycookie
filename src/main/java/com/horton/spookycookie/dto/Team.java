package com.horton.spookycookie.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * @author David Horton
 * Date:   9/16/19
 */
public class Team {

    private String id;
    private int number;
    private List<String> questionIds = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public List<String> getQuestionIds() {
        return questionIds;
    }

    public void setQuestionIds(List<String> questionIds) {
        this.questionIds = questionIds;
    }
}
