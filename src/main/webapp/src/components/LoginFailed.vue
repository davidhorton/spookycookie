<template>
  <div class="main">
    <div style="background-color: rgba(37, 36, 57, 0.9)">
      <b-navbar toggleable="lg" type="dark" variant="purple" class="shadow p-2 mb-4">
        <b-navbar-brand style="padding-left:20%;">Spooky Cookie Admin</b-navbar-brand>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content"></template>
            <b-dropdown-item href="/">Go to quiz</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>

    <div>
      <b-container>
        <b-card header="Gotta login first" id bg-variant="light" class="shadow p-3 mb-5 rounded">
          <p>Nope, wrong credentials. Call David Horton if you're stuck, or <a :href="loginUrl">try again.</a></p>
        </b-card>
      </b-container>
    </div>

  </div>
</template>

<script>
  import { serverUrl } from "../config.js";
  export default {
    name: "LoginFailed",
    data() {
      return {
        loginUrl: serverUrl + "/login"
      };
    },
  };
</script>
