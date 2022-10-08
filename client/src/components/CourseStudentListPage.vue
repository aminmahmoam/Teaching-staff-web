<template>
  <div>
    <div class="title">
      <h2>Students</h2>
    </div>
    <div class="dd">
    <input class="form-control" type="text" placeholder="Search a first name" v-model="search">
    <button class="btn" @click="findStudent">Search</button>
    <button @submit.prevent="goBack()" class="btn" @click="goBack">Back</button>
    <button class="btn" @click="deleteAll">
      Delete all students
    </button>
    </div>
    <div class="tt" v-if="!searched">
     <div v-for="student in students" v-bind:key="student._id">
        <student-item v-bind:student="student"/>
     </div>
     </div>
     <div class="tt" v-else-if="searched">
      <p>{{filteredStudents.firstName}} {{filteredStudents.lastName}}</p>
      <p>Email: {{filteredStudents.emailAddress}}</p>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import StudentItem from './StudentItem'

export default {
  name: 'courseStudentListPage',
  props: ['courseStudentListPage'],
  components: { StudentItem },
  mounted() {
    this.getAllStudents()
  },
  data() {
    return {
      students: [],
      search: '',
      searched: false,
      filteredStudents: {}
    }
  },
  methods: {
    getAllStudents() {
      Api.get(`/courses/${this.$route.params.id}/students`, {
        headers: {
          loginToken: localStorage.loginToken
        }
      })
        .then(response => {
          this.students = response.data.students
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteAll() {
      Api.delete(`/courses/${this.$route.params.id}/students`, {
        headers: {
          loginToken: localStorage.loginToken
        }
      })
        .then(response => {
          alert('The student was added successfully.')
          this.students = response.data.students
        })
        .catch(error => {
          console.log(error)
        })
    },
    findStudent() {
      Api.get(`/courses/${this.$route.params.id}/students`, {
        headers: {
          loginToken: localStorage.loginToken
        }
      })
        .then(response => {
          this.students = response.data.students
          const size = this.students.length
          for (let i = 0; i < size; i++) {
            if (this.students[i].firstName === this.search) {
              this.filteredStudents = this.students[i]
              this.searched = true
            }
          }
        })
    },
    goBack() {
      this.searched = false
      // this.$router.push('/courses/:id')
      // window.location.reload()
    }
  }
}
</script>

<style scoped>
  .dd
  {
  display: flex;
  flex-direction: row;
  }
  .tt {
    display: flex;
    flex-direction: column;
    align-content: center;
    height: 150px;
    background: white;
    padding: 8px;
    border-radius: 10px;
    cursor: default;
    width: 70rem;
    margin-left: 50px;

  }
  .button-control{
    display: flex;
    flex-direction: row;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 0rem;

  }
  .form-control {
    font-size: 18pt;
      display: flex;
      flex-direction: row;
      width: 40rem;
      height: 2rem;
      margin-left: 15rem;
      margin-bottom: 1rem;
      margin-top: 0rem ;
      margin-right: 0rem;

  }
  .title {
  margin-top: 15px;
  margin-left: -1080px;
  }
  .btn{
      background-color:  darkcyan;
      text-decoration-color: black;
      padding: 5px;
      display: flex;
      flex-direction: row;
      margin-left: 1rem;
      margin-right: 0rem;
      margin-top: 0rem;
      margin-bottom: 1rem;
      font-size: 13pt;
      height: 2rem;
      border: none;
    }
    @media (max-width: 768px) {
      .tt {
    display: flex;
    flex-direction: column;
    align-content: center;
    height: 150px;
    padding: 4px;
    border-radius: 5px;
    width: 17rem;
    margin-left: 10px;

  }
      .form-control{
      font-size: 10pt;
      display: flex;
      flex-direction: row;
      width: 10rem;
      height: 1rem;
      margin-left: 0rem;
      margin-bottom: 1rem;
      margin-top: 1rem ;
      margin-right: 0rem;
      }
      .btn{
      padding: 1px;
      display: flex;
      flex-direction: row;
      margin-left: 3px;
      margin-right: 0rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      font-size:.5em;
      height: 1rem;
      text-align: center;
      }
      .btn2{
      padding: 2px;
      margin-left: 1rem;
      margin-right: 0rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      font-size: 5pt;
      height: 1rem;
      text-align: center;
      }
      p{
        font-size: 1em;
      }
    }
  </style>
