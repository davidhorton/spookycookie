package com.horton.spookycookie.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Objects;

/**
 * @author David Horton
 * Date:   9/15/19
 */
@Entity
@Table(name = "skquestion")
public class Question {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long questionID;

    private String name;
    private String questionText;
    private String hint;
    private boolean enabled;
    private String answer1;
    private String answer2;
    private String answer3;
    private String answer4;
    private String answer5;
    private String imageFileName;

    @ManyToOne
    @JoinColumn(name = "quizID", nullable = false, referencedColumnName = "quizID")
    private Quiz quiz;

    public Long getQuestionID() {
        return questionID;
    }

    public void setQuestionID(Long questionID) {
        this.questionID = questionID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getAnswer1() {
        return answer1;
    }

    public void setAnswer1(String answer1) {
        this.answer1 = answer1;
    }

    public String getAnswer2() {
        return answer2;
    }

    public void setAnswer2(String answer2) {
        this.answer2 = answer2;
    }

    public String getAnswer3() {
        return answer3;
    }

    public void setAnswer3(String answer3) {
        this.answer3 = answer3;
    }

    public String getAnswer4() {
        return answer4;
    }

    public void setAnswer4(String answer4) {
        this.answer4 = answer4;
    }

    public String getAnswer5() {
        return answer5;
    }

    public void setAnswer5(String answer5) {
        this.answer5 = answer5;
    }

    public String getImageFileName() {
        return imageFileName;
    }

    public void setImageFileName(String imageFileName) {
        this.imageFileName = imageFileName;
    }

    @JsonIgnore
    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Question question = (Question) o;
        return enabled == question.enabled &&
                Objects.equals(name, question.name) &&
                Objects.equals(questionText, question.questionText) &&
                Objects.equals(hint, question.hint) &&
                Objects.equals(answer1, question.answer1) &&
                Objects.equals(answer2, question.answer2) &&
                Objects.equals(answer3, question.answer3) &&
                Objects.equals(answer4, question.answer4) &&
                Objects.equals(answer5, question.answer5) &&
                Objects.equals(imageFileName, question.imageFileName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, questionText, hint, enabled, answer1, answer2, answer3, answer4, answer5, imageFileName);
    }
}
