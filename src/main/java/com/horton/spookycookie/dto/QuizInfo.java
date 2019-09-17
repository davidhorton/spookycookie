package com.horton.spookycookie.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * @author David Horton
 * Date:   9/17/19
 */
public class QuizInfo {

    private String allDoneMessage;
    private String superDuperHint;
    private List<Team> teams = new ArrayList<>();

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
}
