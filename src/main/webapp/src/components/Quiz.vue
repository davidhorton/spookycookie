<!--suppress HtmlUnknownTag -->
<template>
  <div class="main">
    <div style="background-color: rgba(37, 36, 57, 0.9)">
      <b-navbar toggleable="lg" type="dark" variant="purple" class="shadow p-2 mb-4">
        <b-navbar-brand style="padding-left:20%;">Spooky Cookie!</b-navbar-brand>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content"></template>
            <b-dropdown-item @click="startOver">Start Over</b-dropdown-item>
            <b-dropdown-item href="/admin">Admin</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>

    <div>
      <b-spinner
        v-if="loading"
        style="width: 100px; height: 100px; position: fixed; top: 40%; left: 40%;"
        variant="secondary"
      ></b-spinner>
      <b-container v-if="!loading">

        <b-card header="Choose your team!" v-if="!teamSelected && !allDone" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <div>
            <b-list-group>
              <b-list-group-item v-for="(item, index) in teams" :key="index" button @click="()=>{onSelectTeam(item)}">Team {{item.number}}</b-list-group-item>
            </b-list-group>
          </div>
        </b-card>

        <b-card :header="currentQuestionHeader" v-if="teamSelected && !allDone" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <p style="color:#009c00" v-if="rightAnswer">{{rightAnswerText}}</p>
          <p>{{currentQuestionText}}</p>
          <a :class="showHint ? 'collapsed' : null" @click="showHint = !showHint" href="#">Show hint...</a>
          <b-collapse id="question-hint" class="mt-2" v-model="showHint">
            <b-card>{{currentQuestionHint}}</b-card>

            <a :class="showSuperDuperHint ? 'collapsed' : null" @click="showSuperDuperHint = !showSuperDuperHint" href="#">Still stuck?</a>
            <b-collapse id="super-duper-hint" class="mt-2" v-model="showSuperDuperHint">
              <b-card>{{superDuperHint}}</b-card>
            </b-collapse>
          </b-collapse>
          <p style="color:#e20000" v-if="wrongAnswer">{{wrongAnswerText}}</p>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Type the secret code here"
            type="text"
            style="margin-top: 20px;"
            @keydown.enter="nextQuestion"
            v-model="answer"
          ></b-form-input>
          <div class="pt-4">
            <b-button v-if="!allDone" @click="previousQuestion" variant="primary" class="shadow-sm p-2 rounded float-left">
              <strong>< Back</strong>
            </b-button>
            <b-button v-if="!allDone" @click="nextQuestion" variant="success" class="shadow-sm p-2 rounded float-right">
              <strong>Next ></strong>
            </b-button>
          </div>
        </b-card>

        <b-card header="Nice!" v-if="allDone" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <p style="text-align: center;">{{allDoneText}}</p>
          <div style="text-align: center;">
            <b-button @click="startOver" variant="primary" class="shadow-sm p-2 rounded">
              <strong>Start Over</strong>
            </b-button>
          </div>
        </b-card>
      </b-container>
      <b-modal v-model="errored" centered hide-footer title="No Bueno..." header-bg-variant="danger" header-text-variant="dark">
        <p>Uh oh, something went wrong. Go tell David Horton and he'll fix it!</p>
      </b-modal>
    </div>

  </div>
</template>

<script>
  import axios from "axios";
  import { serverUrl } from "../config.js";
  export default {
    name: "Quiz",
    data() {
      return {
        loading: true,
        errored: false,
        questions: [],
        allDoneText: '',
        superDuperHint: '',
        teamSelected: false,
        teams: [],
        selectedTeam: {},
        answer: '',
        currentStep: 0,
        showHint: false,
        showSuperDuperHint: false,
        allDone: false,
        wrongAnswer: false,
        wrongAnswerText: '',
        rightAnswer: false,
        rightAnswerText: '',
      };
    },
    computed: {
      currentQuestions() {
        const questionsForTeam = [];
        for(let i = 0; i < this.selectedTeam.questionIds.length; i++) {
          for(let j = 0; j < this.questions.length; j++) {
            const q = this.questions[j];
            if(this.selectedTeam.questionIds[i] === q.id && q.enabled) {
              questionsForTeam.push(q);
              break;
            }
          }
        }
        return questionsForTeam;
      },
      currentQuestion() {
        return this.currentQuestions[this.currentStep]
      },
      currentQuestionText() {
        return this.currentQuestion.questionText
      },
      currentQuestionHint() {
        return this.currentQuestion.hint
      },
      currentQuestionHeader() {
        return "Team #" + this.selectedTeam.number + ", Question #" + (this.currentStep + 1)
      },
    },
    methods: {
      onSelectTeam(item) {
        this.selectedTeam = item;
        this.teamSelected = true;
      },
      previousQuestion() {
        if(this.currentStep === 0) {
          this.teamSelected = false;
          this.selectedTeam = {};
        }
        else {
          this.currentStep--;
        }
        this.showHint = false;
        this.showSuperDuperHint = false;
        this.$forceUpdate();
      },
      nextQuestion() {
        const current = this.currentQuestion;
        let foundCorrect = false;
        const answers = [current.answer1, current.answer2, current.answer3, current.answer4, current.answer5];
        for(let i = 0; i < answers.length; i++) {
          if(answers[i] && answers[i].trim() !== "" && this.answer.trim().toUpperCase() === answers[i].trim().toUpperCase()) {
            foundCorrect = true;
            break;
          }
        }

        if(foundCorrect) {
          if (this.currentStep === this.currentQuestions.length - 1) {
            this.allDone = true;
          } else {
            this.currentStep++;
          }
          this.rightAnswer = true;
          this.wrongAnswer = false;
          this.wrongAnswerText = '';
          this.setRightAnswerText();
          this.answer = '';
          this.showHint = false;
          this.showSuperDuperHint = false;
          this.$forceUpdate();
        }
        else {
          this.rightAnswer = false;
          this.wrongAnswer = true;
          this.rightAnswerText = '';
          this.setWrongAnswerText();
        }
      },
      startOver() {
        this.currentStep = 0;
        this.teamSelected = false;
        this.selectedTeam = {};
        this.allDone = false;
      },
      setWrongAnswerText() {
        const wrongMessages = [
          "Nope, that's super duper wrong.",
          "It appears you are silly and put the wrong answer.",
          "Wowza, that is wrong!",
          "No doubt about it - that is wrong.",
          "How about you just put in the right answer this time, okay?",
          "Sorry, that's the wrong answer.",
          "I regret to inform you that that is the wrong answer.",
        ];
        this.wrongAnswerText = wrongMessages[Math.floor(Math.random()*wrongMessages.length)];
      },
      setRightAnswerText() {
        const rightMessages = [
          "Nice! On to the next one!",
          "You done good. Keep going!",
          "Your skill is unmatched. Well done!",
          "Good job!",
          "Yup, that's right!",
        ];
        this.rightAnswerText = rightMessages[Math.floor(Math.random()*rightMessages.length)];
      },
      handleError(errorMsg, errorObject) {
        const message = errorMsg ? errorMsg : errorObject;
        console.log(message);
        this.errored = true;
        if(typeof errorObject === 'object' && errorObject.response.status === 403) {
          window.location.href = "login";
        }
      },
    },
    mounted() {
      axios
        .get(serverUrl + "/api/quiz/current")
        .then(response => {
          const resp = response.data;
          this.teams = resp.teams;
          this.allDoneText = resp.allDoneMessage;
          this.superDuperHint = resp.superDuperHint;
          this.questions = resp.questions;
        })
        .catch(error => {
          this.loading = false;
          this.handleError(null, error);
        })
        .finally(() => (this.loading = false));
    }
  };
</script>

<style scoped>
</style>
