<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store'
  export default {
    store
  }

  document.ondragover = document.ondrop = function (e) {
    e.preventDefault()
    return false
  }
</script>

<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Lato:300,700);

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  body {
    align-items: center;
    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 229, 229, .85) 100%
      );
    /*background-position: center;*/
    display: flex;
    font-family: Lato, Helvetica, sans-serif;
    font-weight: 300;
    /*justify-content: center;
    text-align: center;*/

    #app {
      width: 100%;
      height: 100%;
    }
  }

</style>
