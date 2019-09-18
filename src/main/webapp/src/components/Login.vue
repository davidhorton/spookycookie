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
          <div class="form">
            <form :action="performLoginUrl" method="post" class="login-form">
              <input required id="username" name="username" type="text" placeholder="username"/>
              <input required id="password" name="password" type="password" placeholder="password"/>
              <b-button type="submit" variant="primary" class="shadow-sm p-2 rounded float-left">
                Login
              </b-button>
            </form>
          </div>
        </b-card>
      </b-container>
    </div>
  </div>
</template>

<script>
  import { serverUrl } from "../config.js";
  export default {
    name: "Login",
    data() {
      return {
        performLoginUrl: serverUrl + "/performLogin"
      };
    },
  };
</script>

<style scoped>
  .form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
</style>
