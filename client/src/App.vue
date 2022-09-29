<template>
  <div id="app">
    <Menu />
    <div class="main">
      <Header />
      <router-view/>
    </div>
  </div>
</template>
<script>
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'

export default ({
  components: { Menu, Header }
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main {
  position: absolute;
  width: calc(100% - 250px);
  left: 250px;
  min-height: 100vh;
  background: white;
}
</style>
