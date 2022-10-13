<template>
  <div class="container">
      <div class="form-group">
      <input class="form-control" type="text" placeholder="Search a first name" v-model="search">
      <button class="btn" @click="findStaff">Search</button>
      <button class="btn2" @click="goBack">Back</button>
      </div>
      <div class="st" v-if="!searched">
      <div v-for="staff in staffs" v-bind:key="staff._id">
        <staff-item v-bind:staff="staff"/>
      </div>
      </div>
      <div class="tt" v-else-if="searched">
        <p>{{filteredStaffs.firstName}} {{filteredStaffs.lastName}}</p>
        <p>Email: {{filteredStaffs.emailAddress}}</p>
        <p>Telephone: {{filteredStaffs.telephone}}</p>
      </div>
      </div>
  </template>
<script>
import { Api } from '@/Api'
import StaffItem from '../components/StaffsItem.vue'
export default {
  components: { StaffItem },
  name: 'colleaguesPage',
  props: ['colleaguesPage'],
  data() {
    return {
      staffs: [],
      search: '',
      searched: false,
      filteredStaffs: {}
    }
  },
  mounted() {
    this.getAllStaffs()
  },
  methods: {
    getAllStaffs() {
      Api.get('/staffs', {
        headers: {
          loginToken: localStorage.loginToken
        }
      })
        .then(response => {
          this.staffs = response.data.staffs
        })
        .catch(error => {
          console.log(error)
        })
    },
    findStaff() {
      Api.get('/staffs', {
        headers: {
          loginToken: localStorage.loginToken
        }
      })
        .then(response => {
          this.staffs = response.data.staffs
          const size = this.staffs.length
          for (let i = 0; i < size; i++) {
            if (this.staffs[i].firstName === this.search) {
              this.filteredStaffs = this.staffs[i]
              this.searched = true
            }
          }
        })
    },
    goBack() {
      this.searched = false
      this.$router.push('/ColleaguesPage')
    }
  }
}
</script>
  <style scoped>
    .form-group{
      display: flex;
      flex-direction: row;
      margin-top: 35px;

    }
    .tt {
      display: flex;
      flex-direction: column;
      height: 150px;
      background: white;
      padding: 8px;
      border-radius: 10px;
      cursor: default;
      box-shadow: 0 7px 25px rgba(0,0,0, 0.08);
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
    .btn2{
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
      border-radius: 5px;
    }
    .form-control{
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
    @media (max-width: 1000px) {
      .form-control{
      font-size: 60%;
      display: flex;
      flex-direction: row;
      width: 60%;
      height: 1.5%;
      margin-left: 0rem;
      margin-bottom: 1rem;
      margin-top: 1rem ;
      margin-right: 0rem;
      }
      .btn{
      padding: 2px;
      display: flex;
      flex-direction: row;
      margin-left: 1rem;
      margin-right: 0rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      font-size: 6pt;
      height: 1.2rem;
      width: fit-content;
      text-align: center;
      }
      .btn2{
      padding: 2px;
      margin-left: 1rem;
      margin-right: 0rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      font-size: 6pt;
      width: fit-content;
      height: 1.2rem;
      text-align: center;
      }
      .form-group {
        width: 85%;
      }
    }
    </style>
