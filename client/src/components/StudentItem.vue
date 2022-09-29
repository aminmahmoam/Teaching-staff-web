<template>
    <div class="card">
    <div>
      <p>{{student.firstName}}</p>
      <p>{{student.lastName}}</p>
    </div>
    <p>{{student.emailAddress}}</p>
  </div>
</template>

<script>
export default {
  name: 'student-item',
  props: ['student']
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100px;
  background: white;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 7px 25px rgba(0,0,0, 0.08);
}
</style>
