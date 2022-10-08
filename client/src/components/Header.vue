<template>
<div class="topbar">
    <div class="user">
        <h3>Hello {{userName}}</h3>
    </div>
</div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'header',
  props: ['header'],
  mounted() {
    this.parseJwt(this.token)
    this.getStaffInfo()
  },
  data() {
    return {
      user: JSON,
      token: localStorage.loginToken,
      userName: ''

    }
  },
  methods: {
    parseJwt(token) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
      this.user = JSON.parse(jsonPayload)
    },
    getStaffInfo() {
      Api.get(`/staffs/${this.user._id}`, {
        headers: {
          loginToken: localStorage.loginToken
        }
      })
        .then(response => {
          this.userName = response.data.firstName
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.topbar {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 0 10px;
    background-color: #f5f5f5;
}
.title-header {
    font-size: 1rem;
    color: black;
    margin-top: 1rem;
    margin-left: 1rem;
}
.user {
    display: flex;
    margin-top: 1rem;
    margin-left: 1rem;
    margin-left: 540px;
}

</style>
