<template>
   <div>
    <div class="card">
    <div>
      <p>{{staff.firstName}} {{staff.lastName}}</p>
      <div>
      </div>
      <p>Email: {{staff.emailAddress}}</p>
      <p>Telephone: {{staff.telephone}}</p>
    </div>
    </div>
  </div>
  </template>

<script>
export default {
  name: 'staff-item',
  props: ['staff']
  /*
  computed: {
    Staffs: function () {
      return this.staffs.filter((staff) => {
        return staff.firstName.match(this.search)
      })
    }
  }
  */
}
</script>
<style scoped>
  .card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 150px;
    background: white;
    padding: 8px;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 7px 25px rgba(0,0,0, 0.08);
  }
  </style>
