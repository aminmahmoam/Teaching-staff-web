<template>
<div class="container">
    <h1 class="title">Colleagues</h1>
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
      Api.get('/staffs')
        .then(response => {
          this.staffs = response.data.staffs
        })
        .catch(error => {
          console.log(error)
        })
    },
    findStaff() {
      Api.get('/staffs')
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
    width: 20px;
  }
  .title{
    text-align:left;
    color:green;
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
  .btn{
    background-color: #4CAF50;
    text-decoration-color: black;
    padding: 10px;
    display: flex;
    flex-direction: row;
    margin-left: 1rem;
    margin-right: 0rem;
    margin-top: 0rem;
    margin-bottom: 1rem;
    border-color: green;
    border: green;
    font-size: 10pt;
    height: 2rem;
    text-align: center;

  }
  .btn2{
    background-color: #4CAF50;
    text-decoration-color: black;
    padding: 10px;
    display: flex;
    flex-direction: row;
    margin-left: 1rem;
    margin-right: 0rem;
    margin-top: 0rem;
    margin-bottom: 1rem;
    border-color: green;
    border: #4CAF50;
    font-size: 10pt;
    height: 2rem;
    text-align: center;

  }
  .form-control{
    font-size: 18pt;
    display: flex;
    flex-direction: row;
    width: 30rem;
    height: 2rem;
    margin-left: 27rem;
    margin-bottom: 1rem;
    margin-top: 0rem ;
    margin-right: 0rem;
  }

  @media (max-width: 780px) {
    .title{
      text-align:left;
      color: green;
      font-size: 12pt;
      margin-top: 1rem;
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
    background-color: #4CAF50;
    text-decoration-color: black;
    padding: 5px;
    display: flex;
    flex-direction: row;
    margin-left: 1rem;
    margin-right: 0rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-color: green;
    border: green;
    font-size: 5pt;
    height: 1rem;
    text-align: center;
    }
    .btn2{

    }
  }
  </style>
