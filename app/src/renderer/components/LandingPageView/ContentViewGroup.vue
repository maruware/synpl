<template lang="pug">
  div.content-view-group
    div.content-item(v-for="content in contents" v-bind:class="itemClass")
      content-view(v-bind:content="content" v-bind:current-time="currentTime" v-bind:start-at="startAt" v-bind:duration="duration")

</template>

<script>
  import ContentView from './ContentView'
  export default {
    components: {
      ContentView
    },
    props: ['contents', 'currentTime', 'startAt', 'duration'],
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

    background-color: #333;

    display: flex;
    flex-direction: row;

    .content-item {
      &.half-width {
        width: 50%;
      }
      &.half-height {
        height: 50%;
      }
    }
  }
</style>
