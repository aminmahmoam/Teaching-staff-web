<template>
<div class="profile">
<div class="image">
  <img src="../assets/profile.png" alt="">
</div>
<div class="data">
    <p>Name</p>
    <h3> {{staffFirstName}} {{staffLastName}}</h3>
    <div id="space"></div>
    <p>Telephone Number</p>
    <h3> {{staffTelephone}}</h3>
    <div id="space"></div>
    <p>Email Address</p>
    <h3> {{staffEmail}}</h3>
    <div id="space"></div>
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
          this.staffFirstName = response.data.staff.firstName
          this.staffLastName = response.data.staff.lastName
          this.staffAddress = response.data.staff.address
          this.staffTelephone = response.data.staff.telephone
          this.staffEmail = response.data.staff.emailAddress
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
#space {
  width: 150px;
  height: 4px;
  background-color: darkcyan;
  margin-top: 45px;
  margin-bottom: 45px;
  margin-left: 15%;
  margin-right: 50%;
}
.image {
  margin-left: 5rem;
}

@media(max-width:1000px){
  .profile{
 margin-left: 1rem;
 margin-right: 1rem;
 margin-top: 1rem;
 display: flex;
 flex-direction: column;
}
.data {
  margin-top: 50px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#space {
  width: 150px;
  height: 1px;
  background-color: darkcyan;
  text-align: center;
  padding-left: 70%;
}
  .image{
    margin-left: 20%;
    margin-right:0rem;
    margin-top: 0rem;
    display: flex;
    flex-direction: column;
    width: 60%;
  }
  h3{
    font-size: 1em;
  }
}
</style>
