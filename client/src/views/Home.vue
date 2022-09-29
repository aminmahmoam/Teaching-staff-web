<template>
<div>
  <p>Overview</p>
<div class="cardbox">
  <li class="boxlist"><div class="card">
    <div>
      <div class="cardname">Next Lecture</div>
      <div class="contentTime">{{lectureDate}}</div>
      <div class="content">{{lectureName}}</div>
    </div>
    <div class="material-icons">school</div>
  </div>

  <div class="card">
    <div>
      <div class="cardname">Next Payment</div>
      <div class="paymentDay">In <span class="thePDay">5</span> days</div>
    </div>
    <div class="material-icons">payments</div>
  </div>
  </li>
  <div class="card">
    <div>
      <div class="cardname">To-do list</div>
      <li class="toDo">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </li>
    </div>
    <div class="material-icons">checklist</div>
  </div>

</div>
<p>Courses</p>
<div v-for="course in courses" v-bind:key="course._id">
  <router-link :to="`/courses/${course._id}`">
  <course-item v-bind:course="course"/>
  </router-link>
</div>
</div>
</template>

<script>
import { Api } from '@/Api'
import CourseItem from '../components/CourseItem.vue'

export default {
  name: 'home',
  props: ['home'],
  components: { CourseItem },
  mounted() {
    this.getAllCourses()
    this.setNextLecture()
  },
  data() {
    return {
      courses: [],
      lecturesDates: [],
      lectureDate: '',
      lectureName: ''

    }
  },
  methods: {
    getAllCourses() {
      Api.get('/courses')
        .then(response => {
          this.courses = response.data.courses
        })
        .catch(error => {
          console.log(error)
        })
    },
    setNextLecture() {
      Api.get('/courses')
        .then(response => {
          const size = response.data.courses.length
          let smallest = response.data.courses[0].lectureDates[0]
          let earliestLN = ''
          for (let i = 0; i < size; i++) {
            const dateSize = response.data.courses[i].lectureDates.length
            for (let j = 0; j < dateSize; j++) {
              this.lecturesDates.push(response.data.courses[i].lectureDates[j])
              if (response.data.courses[i].lectureDates[j] <= smallest) {
                smallest = response.data.courses[i].lectureDates[j]
                earliestLN = this.courses[i].name
              }
            }
          }
          this.lectureDate = new Date(smallest * 1000)
          this.lectureName = earliestLN
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.cardbox {
  position: relative;
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2,1fr);
  grid-gap: 30px;
}
.card {
  position: relative;
  background: white;
  padding: 8px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0 7px 25px rgba(0,0,0, 0.08);
}
.cardname {
  color: black;
  font-size: 1.1em;
  margin-top: 5px;
}
.boxlist {

  list-style: none;
  justify-content: space-between;

}
.toDo {
  list-style: none;
  justify-content: space-between;
}

</style>
