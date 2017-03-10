<template lang="pug">
  div.seq-controller
    el-button(v-on:click="play" v-if="!playing")
      i.fa.fa-play
    el-button(v-on:click="pause" v-else)
      i.fa.fa-pause
    el-button(v-on:click="stop")
      i.fa.fa-stop

    el-button(v-on:click="clear")
      i.fa.fa-eject
</template>

<script>
  export default {
    props: ['playing'],
    methods: {
      play () {
        this.$store.dispatch('play')
      },
      pause () {
        this.$store.dispatch('pause')
      },
      stop () {
        this.$store.dispatch('stop')
      },
      clear () {
        this.$store.dispatch('clearContents')
      }
    }
  }
</script>

<style scoped lang="scss">
  .seq-controller {
    width: 100%;
  }
</style>
