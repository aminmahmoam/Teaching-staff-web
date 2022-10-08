<template>
    <div class="card">
    <div class="name">
      <h5>{{student.firstName}} {{student.lastName}}</h5>
    </div>
    <h5>Email: {{student.emailAddress}}</h5>
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
.name {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
  margin-left: 5px;
}
h5 {
  padding: 5px;
}
@media (max-width: 768px){
    .card{
      height: 110px;
      padding-right: 5px;
      padding-left: 5px;
      border-radius: 5px;
    }
    h5 {
    font-size: 1em;
  padding: 2px;
}
  }
</style>
