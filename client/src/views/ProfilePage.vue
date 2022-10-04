<template>
<div class="profile">
    <h1> {{staffFirstName}} {{staffLastName}}</h1>
    <h2> {{staffTelephone}}</h2>
    <h3> {{staffAddress}}</h3>
</div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'ProfilePage',
  props: ['ProfilePage'],
  mounted() {
    this.parseJwt(this.token)
    this.getStaffInfo()
  },
  data() {
    return {
      staffFirstName: '',
      staffLastName: '',
      staffAddress: '',
      staffTelephone: '',
      user: JSON,
      token: localStorage.loginToken
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
      Api.get(`/staffs/${this.user._id}`)
        .then(response => {
          this.staffFirstName = response.data.firstName
          this.staffLastName = response.data.lastName
          this.staffAddress = response.data.address
          this.staffTelephone = response.data.telephone
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
.profile{
 margin-left: 1rem;
 margin-right: 1rem;
 margin-top: 1rem;
}
</style>
