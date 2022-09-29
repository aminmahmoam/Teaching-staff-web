<template>
<div>
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
      Api.get('/staffs/6332b952d273ec4c3842c51d')
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
