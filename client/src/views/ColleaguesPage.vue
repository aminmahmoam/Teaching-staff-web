<template>
<div>
    <h1>These are your colleagues</h1>
    <div v-for="staff in staffs" v-bind:key="staff._id">
      <div>
        <staff-item v-bind:staff="staff"/>
      </div>
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
  mounted() {
    this.getAllStaffs()
  },
  data() {
    return {
      staffs: []
    }
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
    }
  }
}
</script>
