<template>
<div class="profile">
<div class="image">
  <img src="../assets/profile.png" alt="">
</div>
<div class="data">
    <p>Name</p>
    <h3> {{staffFirstName}} {{staffLastName}}</h3>
    <div class="space"></div>
    <p>Telephone Number</p>
    <h3> {{staffTelephone}}</h3>
    <div class="space"></div>
    <p>Email Address</p>
    <h3> {{staffEmail}}</h3>
    <div class="space"></div>
    <p>Home Address</p>
    <h3> {{staffAddress}}</h3>
</div>
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
      staffEmail: '',
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
      Api.get(`/staffs/${this.user._id}`, {
        headers: {
          loginToken: localStorage.loginToken
        }
      })
        .then(response => {
          this.staffFirstName = response.data.firstName
          this.staffLastName = response.data.lastName
          this.staffAddress = response.data.address
          this.staffTelephone = response.data.telephone
          this.staffEmail = response.data.emailAddress
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
 display: flex;
 flex-direction: row;
}
.data {
  margin-top: 100px;
  margin-left: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.space {
  width: 150px;
  height: 4px;
  background-color: darkcyan;
  margin: 45px;
}
.image {
  margin-left: 5rem;
}

</style>
