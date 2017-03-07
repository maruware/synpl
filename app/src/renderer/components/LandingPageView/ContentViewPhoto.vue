<template lang="pug">
  div.frame
    img(v-bind:src="currentSrc")
</template>

<script>
  export default {
    props: ['content', 'currentTime', 'startAt', 'duration'],
    data () {
      return {
        photoIdx: -1
      }
    },
    created () {
      this.$store.watch(state => state.contents.currentTime, (val) => {
        const t = new Date(this.startAt.getTime() + Math.round(val * 1000))
        const idx = this.content.photos.findIndex(p => {
          const diff = Math.abs(p.metadata.date - t)
          return diff < 500
        })
        this.photoIdx = idx
      })
    },
    computed: {
      currentSrc () {
        console.log('photoIdx', this.photoIdx)
        if (this.photoIdx < 0) {
          return ''
        }
        return this.content.photos[this.photoIdx].src
      }
    }
  }
</script>

<style scoped lang="scss">
  .frame {
    width: 100%;
    height: 100%;

    display: flex;

    img {
      margin: auto;
      width: 100%;
      height: auto;
    }
  }
</style>
