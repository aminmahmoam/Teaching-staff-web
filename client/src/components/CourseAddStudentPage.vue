<template>
    <div>
      <h2>Fill in the student's information</h2>
      <h4>Social security number</h4>
        <form>
            <input type="ssn" required v-model="ssn" placeholder="SSN">
        </form>
        <h4>First name</h4>
        <form>
            <input type="firstName" required v-model="fName" placeholder="John">
        </form>
        <h4>Last name</h4>
        <form>
            <input type="lastName" required v-model="lName" placeholder="Andersson">
        </form>
        <h4>Email address</h4>
        <form>
            <input type="emailAddress" required v-model="email" placeholder="example@mail.com">
        </form>
        <button @click="addStudent">Submit</button>

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
      Api.post(`/courses/${this.$route.params.id}/students`, {
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

<style scoped>
h2 {
  margin-top: 15px;

}
input {
  border: none;
  outline: none;
  border-radius: 20px;
  font-size: 20m;
  background-color: #e6e6e6;
  color: #333;
  letter-spacing: 1px;
  width: 20rem;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;

}
h4 {
  padding-top: 30px;

}
button {
    color: #fff;
    padding: 14px 64px;
    margin: 32px auto;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
    border-radius: 10px;
    background-color: darkcyan;
    cursor: pointer;
    transition: opacity 0.4;
  }
  button:hover {
    opacity: 0.9;
  }

</style>
