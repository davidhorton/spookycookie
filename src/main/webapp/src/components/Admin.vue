<!--suppress HtmlUnknownTag, XmlInvalidId -->
<template>
  <div class="main">
    <div style="background-color: rgba(37, 36, 57, 0.9)">
      <b-navbar toggleable="lg" type="dark" variant="purple" class="shadow p-2 mb-4">
        <b-navbar-brand style="padding-left:20%;">Spooky Cookie Admin</b-navbar-brand>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content"></template>
            <b-dropdown-item href="/">Go to quiz</b-dropdown-item>
            <b-dropdown-item href="/logout">Logout</b-dropdown-item>
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

        <b-card header="Quizzes" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <div>
            <b-list-group>
              <b-list-group-item v-for="(item, index) in quizzes" :key="index" button :active="item.selected" @click="()=>{onSelectQuiz(item)}">{{item.name}} {{item.current ? '(Current)' : ''}}</b-list-group-item>
            </b-list-group>

            <p v-if="quizzes.length === 0">Uh oh, there are no quizzes. That probably means something went wrong - talk to David Horton!</p>
          </div>
        </b-card>

        <b-card v-if="quizSelected" header="General" id bg-variant="light" class="shadow p-3 mb-5 rounded">

          <b-container fluid>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="quizNameInput">Quiz Name:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input id="quizNameInput" size="sm" class="mr-sm-2" type="text" v-model="selectedQuiz.name"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label for="allDoneMessageInput">All Done Text:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input id="allDoneMessageInput" size="sm" class="mr-sm-2" type="text" v-model="selectedQuiz.allDoneMessage"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label for="superDuperHintInput">Super Duper Hint Text:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input id="superDuperHintInput" size="sm" class="mr-sm-2" type="text" v-model="selectedQuiz.superDuperHint"></b-form-input>
              </b-col>
            </b-row>
          </b-container>

        </b-card>

        <b-card v-if="quizSelected" header="Questions" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <b-list-group>
            <b-list-group-item v-for="(item, index) in selectedQuiz.questions" :key="index" button :active="item.selected" @click="()=>{onSelectQuestion(item)}">
              {{item.id}}:
              <span v-if="item.enabled">{{item.questionText}}</span>
              <span v-else>(Disabled) <s>{{item.questionText}}</s></span>
            </b-list-group-item>
          </b-list-group>

          <p v-if="selectedQuiz.questions.length === 0">There aren't any questions!</p>

          <div style="text-align: center; margin-top: 25px;">
            <b-button v-if="selectedQuiz.questions.length < 50" @click="addNewQuestionClicked" variant="primary" class="shadow-sm p-2 rounded">
              <strong>Add New</strong>
            </b-button>
          </div>
        </b-card>

        <b-card v-if="quizSelected" header="Teams" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <b-list-group>
            <b-list-group-item v-for="(item, index) in selectedQuiz.teams" :key="index" button :active="item.selected" @click="()=>{onSelectTeam(item)}">Team {{item.number}}</b-list-group-item>
          </b-list-group>

          <p v-if="selectedQuiz.teams.length === 0">There aren't any teams!</p>

          <div style="text-align: center; margin-top: 25px;">
            <b-button v-if="selectedQuiz.teams.length > 0" @click="removeTeamClicked" variant="danger" class="shadow-sm p-2 rounded">
              <strong>Remove 1 Team</strong>
            </b-button>
            <b-button v-if="selectedQuiz.teams.length < 20" @click="addNewTeamClicked" variant="primary" class="shadow-sm p-2 rounded">
              <strong>Add 1 More Team</strong>
            </b-button>
          </div>
        </b-card>

        <b-card v-if="quizSelected && teamSelected" :header="questionOrderingHeader" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <b-list-group>
            <b-list-group-item v-for="(item, index) in selectedTeam.questionIds" :key="index">
              {{item}}:
              <span v-if="questionEnabledFromID(item)">{{questionTextFromID(item)}}</span>
              <span v-else>(Disabled) <s>{{questionTextFromID(item)}}</s></span>
            </b-list-group-item>
          </b-list-group>

          <p v-if="selectedTeam.questionIds.length === 0">No questions added yet for this team</p>
        </b-card>

        <div v-if="quizSelected" style="text-align: center; margin-bottom: 30px;">
          <b-button @click="cancel" variant="warning" class="shadow-sm p-2 rounded">
            <strong>Cancel</strong>
          </b-button>
          <b-button @click="save" variant="primary" class="shadow-sm p-2 rounded">
            <strong>Save All The Things</strong>
          </b-button>
        </div>

      </b-container>

      <b-modal size="lg" header-bg-variant="light" v-model="showQuestionModal" centered hide-footer @hide="deselectAllQuestions" :title="questionModalHeader">
        <b-container fluid>

          <b-row v-if="!addNewQuestion" class="my-1">
            <b-col sm="3">
              <label for="questionIDInput">ID:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="questionIDInput" size="sm" class="mr-sm-2" type="text" :disabled=true v-model="selectedQuestion.id"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="3">
              <label for="enabledCheckbox">Enabled:</label>
            </b-col>
            <b-col sm="9">
              <b-form-checkbox id="enabledCheckbox" v-model="selectedQuestion.enabled"></b-form-checkbox>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="3">
              <label for="questionTextInput">Question Text:</label>
            </b-col>
            <b-col sm="9">
              <b-form-textarea id="questionTextInput" rows="3" max-rows="6" v-model="selectedQuestion.questionText"></b-form-textarea>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="3">
              <label for="hintInput">Hint:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="hintInput" size="sm" class="mr-sm-2" type="text" v-model="selectedQuestion.hint"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="3">
              <label for="answer1Input">Answer 1:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="answer1Input" size="sm" class="mr-sm-2" type="text" v-model="selectedQuestion.answer1"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="3">
              <label for="answer2Input">Answer 2 (optional):</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="answer2Input" size="sm" class="mr-sm-2" type="text" v-model="selectedQuestion.answer2"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="3">
              <label for="answer3Input">Answer 3 (optional):</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="answer3Input" size="sm" class="mr-sm-2" type="text" v-model="selectedQuestion.answer3"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="3">
              <label for="answer4Input">Answer 4 (optional):</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="answer4Input" size="sm" class="mr-sm-2" type="text" v-model="selectedQuestion.answer4"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="3">
              <label for="answer5Input">Answer 5 (optional):</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="answer5Input" size="sm" class="mr-sm-2" type="text" v-model="selectedQuestion.answer5"></b-form-input>
            </b-col>
          </b-row>

          <div v-if="addNewQuestion" style="text-align: center; margin-top: 25px;">
            <b-button @click="saveQuestionClicked" variant="primary" class="shadow-sm p-2 rounded">
              <strong>Save New Question</strong>
            </b-button>
          </div>

          <div v-if="!addNewQuestion" style="text-align: center; margin-top: 25px;">
            <b-button @click="deleteQuestionClicked" variant="danger" class="shadow-sm p-2 rounded">
              <strong>Delete Question</strong>
            </b-button>
          </div>
        </b-container>
      </b-modal>

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
    name: "Admin",
    data() {
      return {
        loading: true,
        errored: false,
        quizzes: [],
        quizSelected: false,
        selectedQuiz: {},
        teamSelected: false,
        selectedTeam: {},
        selectedQuestion: {},
        addNewQuestion: false,
        showQuestionModal: false,
        newQuestionCounter: 1,
      };
    },
    computed: {
      questionOrderingHeader() {
        return "Question Ordering for Team #" + this.selectedTeam.number
      },
      questionModalHeader() {
        return this.addNewQuestion ? 'Add New Question' : 'Edit Question';
      },
    },
    methods: {
      onSelectQuiz(item) {
        this.selectedQuiz = item;
        this.quizSelected = true;
        this.deselectAllQuizzes();
        item.selected = true;
      },
      deselectAllQuizzes() {
        for(let i = 0; i < this.quizzes.length; i++) {
          this.quizzes[i].selected = false;
        }
      },
      onSelectQuestion(item) {
        this.selectedQuestion = item;
        this.deselectAllQuestions();
        item.selected = true;
        this.addNewQuestion = false;
        this.showQuestionModal = true;
      },
      deselectAllQuestions() {
        for(let i = 0; i < this.quizzes.length; i++) {
          for (let j = 0; j < this.quizzes[i].questions.length; j++) {
            this.quizzes[i].questions[j].selected = false;
          }
        }
      },
      addNewQuestionClicked() {
        this.selectedQuestion = {
          id: 'NEW' + this.newQuestionCounter++,
          questionText: '',
          hint: '',
          enabled: true,
          answer1: '',
          answer2: '',
          answer3: '',
          answer4: '',
          answer5: '',
        };
        this.deselectAllQuestions();
        this.addNewQuestion = true;
        this.showQuestionModal = true;
      },
      saveQuestionClicked() {
        this.selectedQuiz.questions.push({
          id: this.selectedQuestion.id,
          questionText: this.selectedQuestion.questionText,
          hint: this.selectedQuestion.hint,
          enabled: this.selectedQuestion.enabled,
          answer1: this.selectedQuestion.answer1,
          answer2: this.selectedQuestion.answer2,
          answer3: this.selectedQuestion.answer3,
          answer4: this.selectedQuestion.answer4,
          answer5: this.selectedQuestion.answer5,
        });
        this.selectedQuestion = {};
        this.deselectAllQuestions();
        this.showQuestionModal = false;
      },
      deleteQuestionClicked() {
        const idToDelete = this.selectedQuestion.id;
        for (let i = 0; i < this.selectedQuiz.questions.length; i++) {
          if(this.selectedQuiz.questions[i].id === idToDelete) {
            this.selectedQuiz.questions.splice(i, 1);
            break;
          }
        }

        for (let i = 0; i < this.selectedQuiz.teams.length; i++) {
          for (let j = 0; j < this.selectedQuiz.teams[i].questionIds.length; j++) {
            if(this.selectedQuiz.teams[i].questionIds[j] === idToDelete) {
              this.selectedQuiz.teams[i].questionIds.splice(j, 1);
              break;
            }
          }
        }
        this.selectedQuestion = {};
        this.deselectAllQuestions();
        this.showQuestionModal = false;
      },
      onSelectTeam(item) {
        this.selectedTeam = item;
        this.teamSelected = true;
        this.deselectAllTeams();
        item.selected = true;
      },
      deselectAllTeams() {
        for(let i = 0; i < this.quizzes.length; i++) {
          for (let j = 0; j < this.quizzes[i].teams.length; j++) {
            this.quizzes[i].teams[j].selected = false;
          }
        }
      },
      addNewTeamClicked() {
        this.selectedQuiz.teams.push({
          id: 'NEW' + this.newQuestionCounter++,
          number: this.selectedQuiz.teams.length + 1,
          questionIds: []
        });
      },
      removeTeamClicked() {
        this.selectedQuiz.teams.pop();
      },
      questionEnabledFromID(item) {
        for (let i = 0; i < this.selectedQuiz.questions.length; i++) {
          if(this.selectedQuiz.questions[i].id === item) {
            return this.selectedQuiz.questions[i].enabled;
          }
        }
        return false;
      },
      questionTextFromID(item) {
        for (let i = 0; i < this.selectedQuiz.questions.length; i++) {
          if(this.selectedQuiz.questions[i].id === item) {
            return this.selectedQuiz.questions[i].questionText;
          }
        }
        return "";
      },
      save() {

      },
      cancel() {
        window.location.reload();
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
        .get(serverUrl + "/api/admin/quiz")
        .then(response => {
          this.quizzes = response.data.quizzes;
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
