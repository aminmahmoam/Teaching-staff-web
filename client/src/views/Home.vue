<template>
<div class="home">
  <p class="overview">Overview</p>
<div class="cardbox">
  <li class="boxlist"><div class="card">
    <div>
      <div class="cardname">Next Lecture</div>
      <div class="contentTime">{{lectureDate}}</div>
      <div class="content">{{lectureName}}</div>
    </div>
  </div>

  <div class="card">
    <div>
      <div class="cardname">Next Payment</div>
      <div class="paymentDay">In <span class="thePDay">{{payDay}}</span> days</div>
    </div>
  </div>
  </li>
  <div class="card">
    <div>
      <div class="cardname">To-do List</div>
      <li class="toDo">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </li>
    </div>
  </div>

</div>
<p>Courses</p>
<ul class="list-of-courses-ul">
<li class="list-of-courses-li" v-for="course in courses" v-bind:key="course._id">

    <router-link :to="`/courses/${course._id}`">
    <course-item v-bind:course="course"/>
    </router-link>
</li>
</ul>
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
    this.parseJwt(this.token)
    this.getAllCourses()
    this.setNextLecture()
    this.setNextPayment()
  },
  data() {
    return {
      courses: [],
      lecturesDates: [],
      paymentDates: [],
      lectureDate: '',
      lectureName: '',
      payDay: '',
      token: localStorage.loginToken,
      user: JSON
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

      console.log(this.user)
    },
    getAllCourses() {
      Api.get(`/staffs/${this.user._id}/courses`, {
        headers: {
          loginToken: localStorage.loginToken
        }
      })
        .then(response => {
          console.log(response.status)
          this.courses = response.data.courses
        })
        .catch(error => {
          localStorage.removeItem('loginToken')
          console.log(error)
        })
    },
    setNextLecture() {
      Api.get(`/staffs/${this.user._id}/courses`, {
        headers: {
          loginToken: localStorage.loginToken
        }
      })
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
    },
    setNextPayment() {
      Api.get(`/staffs/${this.user._id}`, {
        headers: {
          loginToken: localStorage.loginToken
        }
      })
        .then(response => {
          const size = response.data.paymentDates.length
          let smallest = response.data.paymentDates[0]
          for (let i = 0; i < size; i++) {
            this.paymentDates.push(response.data.paymentDates[0])
            if (response.data.paymentDates[0] <= smallest) {
              smallest = response.data.paymentDates[0]
            }
          }
          this.payDay = new Date(smallest * 1000)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.home {
  background-color: white;
  width: calc(100%);
  left: 210px;
}
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
  border-radius: 10px;
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
.list-of-courses-li {
  display: inline-block;
  margin: 25px;

}
p {
  margin-left: -1070px;
  color: #2c3e50;
  font-size: 1.5em;
  font-weight: 3000;
  letter-spacing: 1px;
}

@media (max-width: 768px){
  p{
  margin-left: 60px;
  margin-top: 13px;
  margin-bottom: 5px;
  color: #2c3e50;
  font-size: 1.25em;
  font-weight: 3000;
  letter-spacing: 1px;
}
.home {
  background-color: white;
  width: calc(78%);
  left: 180px;
}
.cardbox {
  position: relative;
  width: 100%;
  padding: 6px;
  display: grid;
  grid-template-columns: repeat(2,1fr);
  grid-gap: 20px;
}
.card {
  position: relative;
  background: white;
  padding: 3px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0 7px 25px rgba(0,0,0, 0.08);
}
.cardname {
  color: black;
  font-size: 1.1em;
  margin-top: 3px;
}
.boxlist {

  list-style: none;
  justify-content: space-between;

}
.toDo {
  list-style: none;
  justify-content: space-between;
}
.list-of-courses-li {
  display: inline-block;
  margin: 25px;

}
}
</style>
