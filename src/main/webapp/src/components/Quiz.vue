<!--suppress HtmlUnknownTag -->
<template>
  <div class="main">
    <div style="background-color: rgba(37, 36, 57, 0.9)">
      <b-navbar toggleable="lg" type="dark" variant="purple" class="shadow p-2 mb-4">
        <b-navbar-brand style="padding-left:20%;">{{quizName}}</b-navbar-brand>

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

        <b-card header="Welcome!" v-if="!nameEntered" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <p>Please enter your name:</p>

          <p style="color:#e20000" v-if="!nameEnteredValid">Type in your name!</p>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            type="text"
            style="margin-top: 20px;"
            @keydown.enter="onNameEntered"
            v-model="name"
          ></b-form-input>
          <div class="pt-4">
            <b-button @click="onNameEntered" variant="success" class="shadow-sm p-2 rounded float-right">
              <strong>Next ></strong>
            </b-button>
          </div>
        </b-card>

        <b-card header="Choose your team!" v-if="nameEntered && !teamSelected && !allDone" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <div>
            <b-list-group>
              <b-list-group-item v-for="(item, index) in teams" :key="index" button @click="()=>{onSelectTeam(item)}">Team {{item.number}}</b-list-group-item>
            </b-list-group>
          </div>
        </b-card>

        <b-card :header="currentQuestionHeader" v-if="teamSelected && !allDone" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <p style="color:#009c00" v-if="rightAnswer">{{rightAnswerText}}</p>

          <img v-if="currentQuestionHasImage" style="display: block; margin-left: auto; margin-right: auto; margin-bottom: 30px;" :src="currentQuestionImage" alt="Hint image">

          <p>{{currentQuestionText}}</p>

          <a :class="showHint ? 'collapsed' : null" @click="showHint = !showHint" href="#">Show hint...</a>
          <b-collapse id="question-hint" class="mt-2" v-model="showHint">
            <b-card>{{currentQuestionHasHint ? currentQuestionHint : superDuperHint}}</b-card>

            <div v-if="currentQuestionHasHint">
              <a :class="showSuperDuperHint ? 'collapsed' : null" @click="showSuperDuperHint = !showSuperDuperHint" href="#">Still stuck?</a>
              <b-collapse id="super-duper-hint" class="mt-2" v-model="showSuperDuperHint">
                <b-card>{{superDuperHint}}</b-card>
              </b-collapse>
            </div>
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
  import Vue from 'vue';
  import axios from "axios";
  import { serverUrl } from "../config.js";
  export default {
    name: "Quiz",
    data() {
      return {
        loading: true,
        errored: false,
        questions: [],
        quizName: '',
        allDoneText: '',
        superDuperHint: '',
        nameEntered: false,
        nameEnteredValid: true,
        name: '',
        teamSelected: false,
        teams: [],
        selectedTeam: {},
        answer: '',
        currentStep: 0,
        sessionID: 0,
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
        for(let i = 0; i < this.selectedTeam.teamQuestionXRefs.length; i++) {
          for(let j = 0; j < this.questions.length; j++) {
            const q = this.questions[j];
            if(this.selectedTeam.teamQuestionXRefs[i].questionID === q.questionID && q.enabled) {
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
      currentQuestionHasHint() {
        return this.currentQuestion.hint.trim() !== ''
      },
      currentQuestionHasImage() {
        return this.currentQuestion.imageFileName && this.currentQuestion.imageFileName.trim() !== ''
      },
      currentQuestionImage() {
        return this.currentQuestion.imageFileName
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
      onNameEntered() {
        if(this.name.trim() !== "") {
          this.nameEntered = true;
        }
        else {
          this.nameEnteredValid = false;
        }
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
          let notificationText = "Team #" + this.selectedTeam.number + ": ";
          if (this.currentStep === this.currentQuestions.length - 1) {
            this.allDone = true;
            notificationText += this.name.trim() + " is all done!";
          } else {
            this.currentStep++;
            notificationText += this.name.trim() + " answered step " + this.currentStep + " correctly!";
          }
          this.rightAnswer = true;
          this.wrongAnswer = false;
          this.wrongAnswerText = '';
          this.setRightAnswerText();
          this.answer = '';
          this.showHint = false;
          this.showSuperDuperHint = false;
          this.$forceUpdate();

          this.sendEvent(notificationText);
        }
        else {
          this.rightAnswer = false;
          this.wrongAnswer = true;
          this.rightAnswerText = '';
          this.setWrongAnswerText();
        }
      },
      startOver() {
        this.rightAnswer = false;
        this.wrongAnswer = false;
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
      sendEvent(text) {
        axios.post(serverUrl + "/api/quiz/event", {
          eventText: text,
          sessionID: this.sessionID
        });
      },
      listenForEvents(sessionID) {
        const evtSource = new EventSource(serverUrl + "/api/event/stream");
        evtSource.onmessage = function (event) {
          if(event && event.data) {
            const eventItem = JSON.parse(event.data);
            if(eventItem.sessionID !== sessionID) {
              const vm = new Vue();
              vm.$bvToast.toast(eventItem.eventText, {
                autoHideDelay: 5000,
                appendToast: true,
                noCloseButton: true,
                toaster: 'b-toaster-bottom-right',
              });
            }
          }
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
          this.quizName = resp.name;
          this.sessionID = Math.floor(Math.random() * Math.floor(99999999));
          this.listenForEvents(this.sessionID);
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
