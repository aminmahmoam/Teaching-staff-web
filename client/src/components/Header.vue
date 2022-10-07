<template>
<div class="topbar">
    <div class="title">
        <span>Dashboard</span>
    </div>
    <div class="user">
        <span class="material-icons">person</span>
        <span>User's name</span>
    </div>
</div>
</template>

<script>
export default {
  name: 'header',
  props: ['header']
}
</script>

<style scoped>
.topbar {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 0 10px;
}
.title {
    font-size: 1rem;
    color: black;
    margin-top: 1rem;
    margin-left: 1rem;
}
.user {
    display: flex;
    margin-top: 1rem;
    margin-left: 1rem;
}

</style>
