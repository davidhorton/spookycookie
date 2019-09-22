package com.horton.spookycookie.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author David Horton
 * Date:   9/16/19
 */
@Entity
@Table(name = "skteam")
public class Team {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long teamID;

    private int number;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @OrderBy("teamQuestionOrder")
    private List<TeamQuestionXRef> teamQuestionXRefs = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "quizID", nullable = false, referencedColumnName = "quizID")
    private Quiz quiz;

    public Long getTeamID() {
        return teamID;
    }

    public void setTeamID(Long teamID) {
        this.teamID = teamID;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    @JsonIgnore
    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public List<TeamQuestionXRef> getTeamQuestionXRefs() {
        return teamQuestionXRefs;
    }

    public void setTeamQuestionXRefs(List<TeamQuestionXRef> teamQuestionXRefs) {
        this.teamQuestionXRefs = teamQuestionXRefs;
    }
}
