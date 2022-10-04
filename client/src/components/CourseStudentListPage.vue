<template>
  <div>
    <p>Courses</p>
    <button @click="deleteAll">
      Delete all students
    </button>
    <p>Students</p>
    <div class="dd">
    <input type="text" placeholder="Search a first name" v-model="search">
    <button class="button-control" @click="findStudent">Search</button>
    <button @submit.prevent="goBack()" class="bb" @click="goBack">Back</button>
    </div>
    <div class="st" v-if="!searched">
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
      Api.get(`/courses/${this.$route.params.id}/students`)
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
      Api.get(`/courses/${this.$route.params.id}/students`)
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
  padding: 8px;
  display: flex;
  flex-direction: row;
  font-size: large;
  margin-right: 120rem;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  }
  .tt {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 150px;
    background: white;
    padding: 8px;
    border-radius: 10px;
    cursor: default;
    box-shadow: 0 7px 25px rgba(0,0,0, 0.08);
  }
  .button-control{
    display: flex;
    flex-direction: row;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 0rem;

  }
  </style>
