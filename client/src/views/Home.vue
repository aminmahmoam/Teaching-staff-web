<template>
<div class="home">
  <p class="overview">Overview</p>
<div class="cardbox">
  <div class="card">
    <div>
      <div class="cardname">Next Lecture</div>
      <div class="separator"></div>
      <div class="contentTime">{{lectureDate}}</div>
      <div class="content">{{lectureName}}</div>
    </div>
  </div>

  <div class="card">
    <div>
      <div class="cardname">Next Payment</div>
      <div class="separator"></div>
      <div class="paymentDay"><span class="thePDay">{{payDay}}</span></div>
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
    this.setToDoList()
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
              if (response.data.courses[i].lectureDates[j] <= smallest && response.data.courses[i].lectureDates[j] >= Date.now()) {
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
          const size = response.data.staff.paymentDates.length
          let smallest = response.data.staff.paymentDates[0]
          for (let i = 0; i < size; i++) {
            this.paymentDates.push(response.data.staff.paymentDates[i])
            if (response.data.staff.paymentDates[i] <= smallest && response.data.staff.paymentDates[i] >= Date.now()) {
              smallest = response.data.staff.paymentDates[i]
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
  display: flex;
  grid-gap: 30px;
  justify-content: space-between;
}
.card {
  position: relative;
  background: white;
  height: 100px;
  width: 1000px;
  padding: 0px;
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
.separator {
  width: 150px;
  height: 4px;
  background-color: darkcyan;
  margin-left: 215px;
  margin-top: 10px;
  margin-bottom: 5px;
}

@media (max-width: 1000px){
  p{
  margin-left: -58%;
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
  width: 120%;
  padding: 6px;
  display: flex;
  justify-content: space-between;
  grid-template-columns: repeat(2,1fr);
  grid-gap: 20px;
  margin-left: 5%;
}
.card {
  position: relative;
  background: white;
  height: 100%;
  width: 200%;
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
.separator {
  width: 100%;
  height: 4px;
  background-color: darkcyan;
  margin-left: 2%;
  margin-top: 10px;
  margin-bottom: 5px;
}
.list-of-courses-li {
  display: inline-block;
  margin-left: 5%;

}
}
</style>
