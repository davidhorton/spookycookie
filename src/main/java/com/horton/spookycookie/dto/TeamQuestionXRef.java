package com.horton.spookycookie.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * @author David Horton
 * Date:   9/19/19
 */
@Entity
@Table(name = "skteamquestionxref")
public class TeamQuestionXRef {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long teamQuestionID;

    private Long questionID;
    private int teamQuestionOrder;

    @ManyToOne
    @JoinColumn(name = "teamID", nullable = false, referencedColumnName = "teamID")
    private Team team;

    public Long getTeamQuestionID() {
        return teamQuestionID;
    }

    public void setTeamQuestionID(Long teamQuestionID) {
        this.teamQuestionID = teamQuestionID;
    }

    public Long getQuestionID() {
        return questionID;
    }

    public void setQuestionID(Long questionID) {
        this.questionID = questionID;
    }

    public int getTeamQuestionOrder() {
        return teamQuestionOrder;
    }

    public void setTeamQuestionOrder(int teamQuestionOrder) {
        this.teamQuestionOrder = teamQuestionOrder;
    }

    @JsonIgnore
    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }
}
