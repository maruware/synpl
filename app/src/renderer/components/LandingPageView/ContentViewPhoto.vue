<template lang="pug">
  div.frame
    img(v-bind:src="photoSrc")
</template>

<script>
  import _ from 'lodash'
  
  export default {
    props: ['content', 'currentTime', 'startAt', 'duration'],
    data () {
      return {
        photoSrc: null
      }
    },
    created () {
      this.$store.watch(state => state.contents.currentTime, (curr) => {
        const offset = this.content.offset
        const worldDate = new Date(this.startAt.getTime() + Math.round(curr * 1000))
        let photoWithDiffs = this.content.photos.map((p) => {
          const photoDate = new Date(p.metadata.date.getTime() + (offset * 1000))
          let diff = worldDate - photoDate
          return {
            photo: p,
            diff
          }
        })
        photoWithDiffs = photoWithDiffs.filter((pd) => {
          return pd.diff >= 0 && pd.diff < 800
        })
        if (photoWithDiffs.length === 0) {
          this.photoSrc = null
          return
        }
        const nearest = _.minBy(photoWithDiffs, pd => pd.diff).photo
        if (nearest.src === this.photoSrc) {
          return
        }
        this.photoSrc = nearest.src
        if (this.content.stepSuspend) {
          this.$store.dispatch('pause')
          this.$store.dispatch('seek', (nearest.metadata.date - this.startAt.getTime()) / 1000 + offset)
        }
      })
    },
    computed: {
      currentSrc () {
        return this.photo ? this.photo.src : ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .frame {
    width: 100%;
    height: 100%;
    text-align: center;

    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
