<template>
  <aside>
    <div class= "logo">
      <img src="../assets/icons8-triangles-50.png" alt="vue">
    </div>
    <h3></h3>
    <div class="menu">
      <router-link class="button" to="/">
      <span class="material-icons">dashboard</span>
      <span class="text">Dashboard</span>
      </router-link>
      <router-link class="button" to="/">
      <span class="material-icons">groups</span>
      <span class="text">Colleagues</span>
      </router-link>
      <router-link class="button" to="/calendar/">
      <span class="material-icons">calendar_month</span>
      <span class="text">Calendar</span>
      </router-link>
      <router-link class="button" to="/">
      <span class="material-icons">person</span>
      <span class="text">Profile</span>
      </router-link>
      <router-link class="button2" to="/">
        <span class="material-icons">logout</span>
        <span class="text">Logout</span>
      </router-link>

    </div>
  </aside>
</template>

<script>
export default {
  name: 'menu',
  props: ['menu']
}
</script>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 250px;
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  background-color: #284b63;
  color: #d9d9d9;
  transition: 0.2s ease-out;
}
menu{
  margin: 0 -1rem;

}
.button{
display: flex;
align-items: center;
min-width: none;

text-decoration: none;
padding: 0.5rem;
margin-bottom: 1rem;
}
a.button:hover{
display: flex;
align-items: center;
text-decoration: none;
padding: 0.5rem 1.5rem;

}
.button2{
display: flex;
align-items: center;
min-width: none;

text-decoration: none;
padding: 0.5rem;
margin-bottom: 1rem;
margin-top: 25rem;
}
a.button2:hover{
display: flex;
align-items: center;
text-decoration: none;
padding: 0.5rem 1.5rem;

}
.material-icons{
  font-size: 2rem;
  color: black;
  margin-right: 1rem;
}
.text{
  color: black;
}
h3{
margin-bottom: 3rem;
}
</style>
