<template lang="pug">
  div.frame
    div#yt-player()

</template>

<script>
  import YouTubePlayer from 'youtube-player'
  export default {
    props: ['content', 'currentTime'],
    mounted () {
      const player = YouTubePlayer('yt-player', {
        videoId: this.content.video.metadata.id,
        width: 1920,
        height: 1080,
        playerVars: {
          autoplay: 0,
          controls: 0
        }
      })

      player.on('ready', () => {
        setInterval(() => {
          player.getCurrentTime()
          .then(t => this.$store.dispatch('videoAdvanced', t))
        }, 100)
      })

      this.$store.watch(state => state.contents.seekedTime, (val) => {
        player.seekTo(val)
      })
      // timeupdateがないのでsetIntervalでやる
      this.$store.watch(state => state.contents.playing, (playing) => {
        if (playing) {
          player.playVideo()
        } else {
          player.pauseVideo()
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

<style lang="scss">
  .frame {
    width: 100%;
    position: relative;
    padding-top: 56.25%;
  }
  #yt-player {
    position: absolute;
    left: 0;
    top: 0;
    width: 100% !important;
    height: 100% !important;
  }
</style>
