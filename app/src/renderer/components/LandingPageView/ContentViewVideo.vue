<template lang="pug">
  video.frame(v-bind:src="content.video.src")
</template>

<script>
  export default {
    props: ['content', 'currentTime'],
    created () {
      // console.log(this.$store.getters.currentTime)
      this.$store.watch(state => state.contents.currentTime, (val) => {
        this.$el.currentTime = val
      })
    },
    watch: {
      // currentTime (val, oldVal) {
      //   console.log('watch currentTime')
      // }
    }

  }
</script>

<style scoped lang="scss">
  .frame {
    width: 100%;
    height: 100%;
  }
</style>
