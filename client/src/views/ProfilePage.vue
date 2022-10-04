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
    this.getStaffInfo()
  },
  data() {
    return {
      staffFirstName: '',
      staffLastName: '',
      staffAddress: '',
      staffTelephone: ''
    }
  },
  methods: {
    getStaffInfo() {
      Api.get('/staffs/63345fb07d18283fa4c25fb1')
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
