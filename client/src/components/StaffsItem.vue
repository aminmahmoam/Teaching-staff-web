<template>
   <div>
    <div class="card">
    <div class="color">
      <span></span>
    </div>
    <div>
      <span class="staffName">{{staff.firstName}} {{staff.lastName}}</span>
      <div>
      <span class="staffCode">{{staff.SSN}}</span>
    </div>
    </div>
  </div>
 </div>
  </template>

<script>
export default {
  name: 'staff-item',
  props: ['staff']
}
</script>
  <style scoped>
  .card {
    display: inline;
    position: relative;
    width: 15rem;
    background: white;
    padding: 8px;
    border-radius: 10px;
    display: flex;
    cursor: pointer;
    box-shadow: 0 7px 25px rgba(0,0,0, 0.08);
  }
  .color {
    display: flex;
    width: 14rem;
    margin-left: 0;
    height: 10rem;
    margin-right: 15px;
    background-color: rgb(152, 211, 63);
  }
  .button{
  display: flex;
  align-items: center;
  min-width: none;
  text-decoration: none;
  padding: 0.5rem;
  margin-bottom: 1rem;
  }
  </style>
