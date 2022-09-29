<template>
    <div v-if="textExist">
        <h1>{{courseName}}</h1>
        <p>{{courseText}}</p>
    </div>
    <div v-else-if="!textExist">
        <h1>{{courseName}}</h1>
        <h3>Hi, at the moment this course page is empty. Fell free to provide the needed discription and information.</h3>
        <form>
            <label>Page text</label>
            <input type="text" required v-model="givenText">
        </form>
        <button @click="addTheText">send</button>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'courseHomePage',
  props: ['courseHomePage'],
  mounted() {
    this.getTheText()
  },
  data() {
    return {
      courseName: '',
      courseText: '',
      textExist: Boolean,
      givenText: ''
    }
  },
  methods: {
    getTheText() {
      Api.get(`/courses/${this.$route.params.id}`)
        .then(response => {
          this.courseName = response.data.name
          this.courseText = response.data.text
          if (this.courseText.trim().length === 0) {
            this.textExist = false
          } else {
            this.textExist = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    addTheText() {
      Api.patch(`/courses/${this.$route.params.id}`,
        {
          text: this.givenText
        })
        .then(response => {
          this.courseText = response.data.text
          window.location.reload()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
