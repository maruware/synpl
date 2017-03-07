<template lang="pug">
  div.seq-controller
    el-button(v-on:click="play" v-if="!playing")
      i.fa.fa-play
    el-button(v-on:click="pause" v-if="playing")
      i.fa.fa-pause
    el-button(v-on:click="stop")
      i.fa.fa-stop

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
      }
    }
  }
</script>

<style scoped lang="scss">
  .seq-controller {
    width: 100%;
  }
</style>
