<template lang="pug">
  div.yt-frame
    resize-observer(@notify="onResize")
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
      player.setPlaybackQuality('hd1080')

      player.on('ready', () => {
        this.fitPlayer()
        this.setupTimeUpdate(player)
      })
      player.on('stateChange', (e) => {
        const state = e.data
        switch (state) {
          case 1:
            this.$store.dispatch('play')
            break
          case 2:
            this.$store.dispatch('pause')
            break
        }
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
      },
      onResize (e) {
        this.fitPlayer()
      },
      fitPlayer () {
        const w = this.$el.clientWidth
        const h = this.$el.clientHeight

        const p = this.$el.querySelector('#yt-player')
        let dw = 0
        let dh = 0
        if ((w / h) > (1920 / 1080)) {
          dh = h
          dw = h * 1920 / 1080
        } else {
          dw = w
          dh = w * 1080 / 1920
        }
        p.setAttribute('width', dw)
        p.setAttribute('height', dh)
      },
      setupTimeUpdate (player) {
        setInterval(() => {
          player.getCurrentTime()
          .then(t => this.$store.dispatch('videoAdvanced', t))
        }, 100)
      }
    }

  }
</script>

<style lang="scss">
  .yt-frame {
    width: 100%;
    height: 100%;

    max-height: 100%;
    text-align: center;
  }
</style>
