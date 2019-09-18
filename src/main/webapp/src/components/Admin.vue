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

        <b-card header="General" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="The 'all done' text"
            type="text"
            style="margin-top: 20px;"
            v-model="allDoneText"
          ></b-form-input>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="The super duper hint"
            type="text"
            style="margin-top: 20px;"
            v-model="superDuperHint"
          ></b-form-input>
        </b-card>

        <b-card header="Teams" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <div>
            <b-list-group>
              <b-list-group-item v-for="(item, index) in teams" :key="index" button :active="item.selected" @click="()=>{onSelectTeam(item)}">Team {{item.number}}</b-list-group-item>
            </b-list-group>
          </div>
        </b-card>

        <b-card v-if="teamSelected" :header="questionOrderingHeader" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <div>

            <b-list-group>
              <b-list-group-item v-for="(item, index) in questions" :key="index" button :active="item.selected" @click="()=>{onSelectTeam(item)}">Team {{item.number}}</b-list-group-item>
            </b-list-group>
          </div>
        </b-card>

        <b-card style="border: none;">
          <div class="pt-4">
            <b-button @click="cancel" variant="warning" class="shadow-sm p-2 rounded float-left">
              <strong>Cancel</strong>
            </b-button>
            <b-button @click="save" variant="success" class="shadow-sm p-2 rounded float-right">
              <strong>Save</strong>
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
    name: "Admin",
    data() {
      return {
        loading: true,
        errored: false,
        allDoneText: '',
        superDuperHint: '',
        teams: [],
        teamSelected: false,
        selectedTeam: {},
        questions: [],
      };
    },
    computed: {
      questionOrderingHeader() {
        return "Question Ordering for Team #" + this.selectedTeam.number
      },
    },
    methods: {
      onSelectTeam(item) {
        this.selectedTeam = item;
        this.teamSelected = true;
        this.deselectAllTeams();
        item.selected = true;
      },
      save() {

      },
      cancel() {

      },
      deselectAllTeams() {
        for(let i = 0; i < this.teams.length; i++) {
          this.teams[i].selected = false;
        }
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
        .get(serverUrl + "/api/quiz/info")
        .then(response => {
          const resp = response.data;
          this.teams = resp.teams;
          this.allDoneText = resp.allDoneMessage;
          this.superDuperHint = resp.superDuperHint;
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
