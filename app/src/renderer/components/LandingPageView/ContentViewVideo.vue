<template lang="pug">
  div.frame
    video(v-bind:src="content.video.src", @timeupdate="videoTimeUpdate", @ended="videoEnded")

</template>

<script>
  export default {
    props: ['content', 'currentTime'],
    mounted () {
      const videoEl = this.$el.querySelector('video')
      this.$store.watch(state => state.contents.seekedTime, (val) => {
        videoEl.currentTime = val
      })
      this.$store.watch(state => state.contents.playing, (playing) => {
        if (playing) {
          videoEl.play()
        } else {
          videoEl.pause()
        }
      })
    },
    methods: {
      videoTimeUpdate (e) {
        this.$store.dispatch('videoAdvanced', e.target.currentTime)
      },
      videoEnded (e) {
        this.$store.dispatch('stop')
      }
    }

  }
</script>

<style scoped lang="scss">
  .frame {
    width: 100%;
    position: relative;
    height: 100%;

    video {
      max-height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>
