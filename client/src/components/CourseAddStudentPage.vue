<template>
    <div>
        <form>
            <label>SSN</label>
            <input type="ssn" required v-model="ssn">
        </form>
        <form>
            <label>First Name</label>
            <input type="firstName" required v-model="fName">
        </form>
        <form>
            <label>Last Name</label>
            <input type="lastName" required v-model="lName">
        </form>
        <form>
            <label>Email Address</label>
            <input type="emailAddress" required v-model="email">
        </form>
        <button @click="addStudent">add</button>

    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'courseAddStudentPage',
  props: ['courseAddStudentPage'],
  data() {
    return {
      ssn: '',
      fName: '',
      lName: '',
      email: ''
    }
  },
  methods: {
    addStudent() {
      Api.post(`/courses/${this.$route.params.id}/students`,
        {
          SSN: this.ssn,
          firstName: this.fName,
          lastName: this.lName,
          emailAddress: this.email
        })
        .then(response => {
          if (response.status === 201) {
            alert('The student was added successfully.')
            window.location.reload()
          } else {
            alert('Something went wrong!')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
