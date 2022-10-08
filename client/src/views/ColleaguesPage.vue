<template>
<div>
    <h1>Colleagues</h1>
    <div class="dd">
    <input type="text" placeholder="Search a first name" v-model="search">
    <button class="button-control" @click="findStaff">Search</button>
    <button class="bb" @click="goBack">Back</button>
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
