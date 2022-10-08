<template>
<div>
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
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'login',
  props: ['login'],
  data() {
    return {
      emailAddress: '',
      password: '',
      authenticated: false
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
