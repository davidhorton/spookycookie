package com.horton.spookycookie.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author David Horton
 * Date:   9/18/19
 */
@Entity
@Table(name = "skquiz")
public class Quiz {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long quizID;

    private String name;
    private boolean current;
    private String allDoneMessage;
    private String superDuperHint;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @OrderBy("number")
    private List<Team> teams = new ArrayList<>();

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @OrderBy("questionID")
    private List<Question> questions = new ArrayList<>();

    public Long getQuizID() {
        return quizID;
    }

    public void setQuizID(Long quizID) {
        this.quizID = quizID;
    }

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

    @JsonIgnore
    public Question getQuestionByID(Long id) {
        return questions.stream().filter(o -> o.getQuestionID().equals(id)).findFirst().orElse(null);
    }
}
