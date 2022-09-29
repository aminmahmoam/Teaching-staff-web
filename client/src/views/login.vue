<template>
    <div>
   <form>
    <label>emailAddress</label>
        <input type="emailAddress" required v-model="emailAddress">
   </form>
   <form>
    <label>password</label>
    <input type="password" required v-model="password">
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
      password: ''
    }
  },
  methods: {
    loginStaff() {
      Api.post('/staffs',
        {
          emailAddress: this.emailAddress,
          password: this.password
        })
        .then(response => {
          if (response.status === 200) {
            this.$router.push('/')
          }
        }
        )
    }
  }
}
</script>
