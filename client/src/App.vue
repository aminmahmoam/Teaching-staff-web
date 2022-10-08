<template>
  <div id="app-login" v-if=!authenticated>
    <div class="background">
    <div class="logoL">
      <img src="./assets/logo-no-background.png" alt="">
    </div>
    <div class="login-main">

      <section class="side">
      <img src="./assets/login4.png" alt="">
      </section>

      <section class="login-container">
        <p class="title">Welcome back</p>

        <div class="separator"></div>

        <p class="welcome-message">Please,
          provide login credential to proceed
          and have access to all our services</p>

        <div name='myForm' class="login-form" autocomplete="off">

          <form class="form-control">
            <input type="email" required v-model="email" placeholder="Email address">
            <i class="material-icons">person</i>
          </form>

          <form class="form-control">
            <input type="pass" required v-model="pass" placeholder="Password">
            <i class="material-icons">lock</i>
          </form>

          <button class="submit" @click="loginStaff">Login</button>

        </div>

      </section>

    </div>
    </div>
  </div>
  <div id="app" v-else-if=authenticated>
    <Menu />
    <div class="main">
      <Header />
      <button class="logout" @click="logout">logout</button>
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
    this.alwaysCheckToken()
    this.checkAuthentication()
  },
  data() {
    return {
      authenticated: Boolean,
      email: '',
      pass: '',
      time: null
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('loginToken')
      this.authenticated = !this.authenticated
    },
    checkAuthentication() {
      if (localStorage.getItem('loginToken') === null) {
        this.authenticated = false
      } else {
        this.authenticated = true
      }
    },
    alwaysCheckToken() {
      this.time = setInterval(() => {
        this.checkAuthentication()
      }, 1000)
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
            this.email = ''
            this.pass = ''
          } else {
            this.authenticated = false
          }
        }
        )
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main {
  position: absolute;
  width: calc(100% - 210px);
  left: 210px;
  min-height: 100vh;
  background: white;
  position: relative;
}
#app-login {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #303433;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.background {
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(to
    left, #c3dede, white);
  display: flex;
  flex-direction: column;
}
.login-main {
  position: absolute;
  width: calc(100% - 250px);
  top: 80px;
  left: 130px;
  min-height: 78vh;
  background: white;
  display: flex;
  justify-content: space-between;
  text-align: center;
  color: #303433;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.section.side {
  background-size: 100% 102%;
}

.side img {
  margin-left: -55px;
  width: 90%;
  max-width: 90%;
}

.login-container {
  max-width: 500px;
  padding: 24px;
  padding-left: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
}

.title {
  text-transform: uppercase;
  font-size: 3em;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
}
.separator {
  width: 150px;
  height: 4px;
  background-color: darkcyan;
  margin: 24px;
}
.welcome-message {
  text-align: center;
  font-size: 1.1em;
  line-height: 28px;
  margin-bottom: 30px;
  color: #696969;
}
.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.form-control {
  width: 100%;
  position: relative;
  margin-bottom: 24px;
}
input,
button {
  border: none;
  outline: none;
  border-radius: 30px;
  font-size: 1.1m;
}
input {
  width: 100%;
  background-color: #e6e6e6;
  color: #333;
  letter-spacing: 0.5px;
  padding: 14px 64px;
}
input ~ i {
  position: absolute;
  left: 32px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  transition: color   0.4s;
  }
  input:focus ~ i {
    color: darkcyan;
  }
  button.submit {
    color: #fff;
    padding: 14px 64px;
    margin: 32px auto;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
    background-image: linear-gradient(to
    right, darkcyan, black);
    cursor: pointer;
    transition: opacity 0.4;
  }
  button.submit:hover {
    opacity: 0.9;
  }
  .logoL img {
  width: 10%;
  max-width: 10%;
  padding-bottom: 5px;
  margin-left: -57rem;
  }
  .logout {
    margin-left: 1120px;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    background-color:#f5f5f5;
    border-radius: 10px;
    size: 10px;
    transition: opacity 0.4;
  }
</style>
