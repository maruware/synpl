<template lang="pug">
  video.frame(v-bind:src="content.video.src", v-on:timeupdate="videoTimeUpdate")
</template>

<script>
  export default {
    props: ['content', 'currentTime'],
    created () {
      this.$store.watch(state => state.contents.seekedTime, (val) => {
        this.$el.currentTime = val
      })
      this.$store.watch(state => state.contents.playing, (playing) => {
        if (playing) {
          this.$el.play()
        } else {
          this.$el.pause()
        }
      })
    },
    methods: {
      videoTimeUpdate (e) {
        this.$store.dispatch('videoAdvanced', e.target.currentTime)
      }
    }

  }
</script>

<style scoped lang="scss">
  .frame {
    width: 100%;
    height: 100%;
  }
</style>
