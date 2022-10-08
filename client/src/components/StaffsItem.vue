<template>
   <div>
    <div class="card">
    <div class="result">
      <p>{{staff.firstName}} {{staff.lastName}}</p>
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
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
    background: white;
    padding: 8px;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 7px 25px rgba(0,0,0, 0.08);
  }
  .result{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  @media (max-width: 768px){
    .card{
      height: 150px;
      padding-right: 5px;
      padding-left: 5px;
    }
    .result{
      padding: 2px;
      margin-left: 2px;
      display: block;
      justify-content: space-between;

    }
  }
  </style>
