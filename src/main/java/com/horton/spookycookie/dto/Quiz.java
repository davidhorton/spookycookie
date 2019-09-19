package com.horton.spookycookie.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * @author David Horton
 * Date:   9/18/19
 */
public class Quiz {

    private String name;
    private boolean current;
    private String allDoneMessage;
    private String superDuperHint;
    private List<Team> teams = new ArrayList<>();
    private List<Question> questions = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isCurrent() {
        return current;
    }

    public void setCurrent(boolean current) {
        this.current = current;
    }

    public String getAllDoneMessage() {
        return allDoneMessage;
    }

    public void setAllDoneMessage(String allDoneMessage) {
        this.allDoneMessage = allDoneMessage;
    }

    public String getSuperDuperHint() {
        return superDuperHint;
    }

    public void setSuperDuperHint(String superDuperHint) {
        this.superDuperHint = superDuperHint;
    }

    public List<Team> getTeams() {
        return teams;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
