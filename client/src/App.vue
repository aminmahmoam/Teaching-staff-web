<template>
  <div v-if="!authenticated">
    <form>
    <label>emailAddress</label>
        <input type="email" required v-model="email">
   </form>
   <form>
    <label>password</label>
    <input type="pass" required v-model="pass">
   </form>
   <button @click="loginStaff">Login</button>

</div>
  <div id="app" v-else-if="authenticated">
    <Menu />
    <div class="main">
      <Header />
      <router-view/>
    </div>
  </div>
</template>
<script>
import { Api } from '@/Api'
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'

export default {
  components: { Menu, Header },
  data() {
    return {
      authenticated: false,
      email: '',
      pass: ''
    }
  },
  methods: {
    loginStaff() {
      Api.post('/login',
        {
          emailAddress: this.email,
          password: this.pass
        })
        .then(response => {
          if (response.status === 200) {
            this.authenticated = true
          } else {
            this.authenticated = false
          }
        }
        )
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main {
  position: absolute;
  width: calc(100% - 250px);
  left: 250px;
  min-height: 100vh;
  background: white;
}
</style>
