<template lang="pug">
  div.content-view-group
    div.content-item(v-for="content in contents" v-bind:class="itemClass")
      content-view(:content="content", :current-time="currentTime", :start-at="startAt", :duration="duration", :playing="playing")

</template>

<script>
  import ContentView from './ContentView'
  export default {
    components: {
      ContentView
    },
    props: ['contents', 'currentTime', 'startAt', 'duration', 'playing'],
    computed: {
      itemClass () {
        return {
          'half-width': this.contents.length >= 2,
          'half-height': this.contents.length >= 3
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .content-view-group {
    width: 100%;
  	height: 100%;

    background-color: #111;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .content-item {
      width: 100%;
      height: 100%;
      &.half-width {
        width: 50%;
      }
      &.half-height {
        height: 50%;
      }
    }
  }
</style>
