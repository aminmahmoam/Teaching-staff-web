<template>
  <div>
    <p>Courses</p>
     <div v-for="student in students" v-bind:key="student._id">
        <student-item v-bind:student="student"/>
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
      students: []
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
    }
  }

}
</script>
