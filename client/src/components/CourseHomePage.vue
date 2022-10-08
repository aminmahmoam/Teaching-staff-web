<template>
  <div class="container">
    <div v-if="textExist">
        <h2>{{courseName}}</h2>
        <p>{{courseText}}</p>
    </div>
    <div v-else-if="!textExist">
        <h2>{{courseName}}</h2>
        <h4>The home page is empty at the moment. Fell free to provide the needed discription and information.</h4>
        <textarea rows= "15" cols="125" type="text" name="input" placeholder="type here" required="required" v-model="givenText">
        </textarea>
        <div>
          <button @click="addTheText">Submit</button>
        </div>
    </div>
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
      Api.get(`/courses/${this.$route.params.id}`, {
        headers: {
          loginToken: localStorage.loginToken
        }
      })
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
      Api.patch(`/courses/${this.$route.params.id}`, {
        text: this.givenText
      }
      )
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

<style scoped>
h2 {
  margin-top: 15px;
  text-align: left;
}
h4 {
  margin-top: 15px;
  margin-left: -70px;
}
input {
  width: 1000px;
  height: 500px;
}
.text-box {
 border: solid 1px black;
 min-width:100px;
 padding: 5px;
 display: inline-block;
}
.text-box:focus{
  outline:0;
}
textarea {
  margin-top: 25px;
}
button {
  background-color:  darkcyan;
  text-decoration-color: black;
  padding: 5px;
}
</style>
