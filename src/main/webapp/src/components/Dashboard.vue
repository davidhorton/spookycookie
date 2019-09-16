<template>
  <div class="main">
    <div style="background-color: rgba(37, 36, 57, 0.9)">
      <b-navbar toggleable="lg" type="dark" variant="purple" class="shadow p-2 mb-4">
        <b-navbar-brand style="padding-left:20%;">Spooky Cookie!</b-navbar-brand>
      </b-navbar>
    </div>

    <div>
      <b-spinner
        v-if="loading"
        style="width: 100px; height: 100px; position: fixed; top: 40%; left: 50%;"
        variant="secondary"
      ></b-spinner>
      <b-container v-if="!loading">

        <b-card v-if="!teamSelected && !allDone" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <div style="max-height: 400px; overflow-y: scroll;">
            <b-list-group>
              <b-list-group-item v-for="(item, index) in teams" :key="index" button @click="()=>{onSelectTeam(item)}">Team {{item.number}}</b-list-group-item>
            </b-list-group>
          </div>
        </b-card>

        <b-card v-if="teamSelected && !allDone" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <p>{{currentQuestionText}}</p>
          <p style="color:red" v-if="wrongAnswer">{{wrongAnswerText}}</p>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="secret code"
            type="text"
            v-model="answer"
          ></b-form-input>
          <div class="pt-4">
            <b-button v-if="currentStep !== 0 && !allDone" @click="previousQuestion" variant="primary" class="shadow-sm p-2 rounded float-left">
              <strong>< Back</strong>
            </b-button>
            <b-button v-if="!allDone" @click="nextQuestion" variant="success" class="shadow-sm p-2 rounded float-right">
              <strong>Next ></strong>
            </b-button>
          </div>
        </b-card>

        <b-card v-if="allDone" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <p style="text-align: center;">All done! You did it!</p>
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
        teamSelected: false,
        teams: [],
        selectedTeam: {},
        answer: '',
        currentStep: 0,
        allDone: false,
        wrongAnswer: false,
        wrongAnswerText: '',
      };
    },
    computed: {
      currentQuestion() {
        return this.questions[this.currentStep]
      },
      currentQuestionText() {
        return this.currentQuestion.questionText
      },
    },
    methods: {
      onSelectTeam(item) {
        this.loading = true;
        axios
          .get(serverUrl + "/api/quiz/team/" + item.id + "/questions")
          .then(response => {
            this.selectedTeam = item;
            this.questions = response.data;
          })
          .catch(error => {
            this.loading = false;
            this.handleError(null, error);
          })
          .finally(() => (this.loading = false));
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
      },
      nextQuestion() {
        const current = this.currentQuestion;
        let foundCorrect = false;
        for(let i = 0; i < current.answers.length; i++) {
          if(this.answer.trim().toUpperCase() === current.answers[i].trim().toUpperCase()) {
            foundCorrect = true;
          }
        }

        if(foundCorrect) {
          if (this.currentStep === this.questions.length - 1) {
            this.allDone = true;
          } else {
            this.currentStep++;
          }
          this.wrongAnswer = false;
          this.wrongAnswerText = '';
          this.answer = '';
        }
        else {
          this.wrongAnswer = true;
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
          "How about you just put in the right answer this time, okay?"
        ];
        this.wrongAnswerText = wrongMessages[Math.floor(Math.random()*wrongMessages.length)];
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
        .get(serverUrl + "/api/quiz/teams")
        .then(response => {
          this.teams = response.data;
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
