<template>
  <div class="container">
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
    <form @submit.prevent="submitFile()" enctype="multipart/form-data">
      <div v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`">
        <div class="message-body">{{message}}</div>
      </div>
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" name="myFiles" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
      <button v-on:click="submitFile()">Submit</button>
    </div>
    </form>
  </div>
</template>

<script>
import { Api } from '@/Api'
import axios from 'axios'

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
      givenText: '',
      file: '',
      message: '',
      error: false
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
    },
    async submitFile() {
      const formData = new FormData()
      formData.append('file', this.file)
      /* axios.post('/single-file', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function () {
        console.log('SUCCESS!!')
      })
        .catch(function () {
          console.log('FAILURE!!')
        })
    }
    */
      try {
        await axios.post('http://localhost:3000/upload', formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        console.log('success')
        this.message = 'File has been uploaded'
        this.file = ''
        this.error = false
      } catch (err) {
        console.log(err)
        this.message = 'Something went wrong'
        this.error = true
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
      this.error = false
      this.message = ''
    }
  }
}
</script>
