<template>
  <div v-if=!authenticated>
    <form name='myForm' autocomplete="off">
    <label>emailAddress</label>
        <input type="email" required v-model="email">
   </form>
   <form>
    <label>password</label>
    <input type="pass" required v-model="pass">
   </form>
   <button @click="loginStaff">Login</button>

</div>
  <div id="app" v-else-if=authenticated>
    <Menu />
    <div class="main">
      <Header />
      <button @click="logout">logout</button>
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
  mounted() {
    console.log(localStorage.getItem('loginToken'))
    this.checkAuthentication()
  },
  data() {
    return {
      authenticated: Boolean,
      email: '',
      pass: ''
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('loginToken')
      this.authenticated = !this.authenticated
      window.location.reload()
    },
    checkAuthentication() {
      if (localStorage.getItem('loginToken') === null) {
        this.authenticated = false
      } else {
        this.authenticated = true
      }
    },
    loginStaff() {
      Api.post('/login',
        {
          emailAddress: this.email,
          password: this.pass
        })
        .then(response => {
          if (response.status === 200) {
            localStorage.loginToken = response.data.token
            console.log(localStorage.loginToken)
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
