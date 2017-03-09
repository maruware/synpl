<template lang="pug">
  div.frame
    img(v-bind:src="currentSrc")
</template>

<script>
  const findMin = (ary, fn) => {
    let minElem = null
    let minVal = Infinity
    let minIdx = 0
    ary.forEach((e, i) => {
      const v = fn(e)
      if (v < minVal) {
        minVal = v
        minElem = e
        minIdx = i
      }
    })
    return {e: minElem, v: minVal, i: minIdx}
  }
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
        const {v, i} = findMin(this.content.photos, p => {
          const diff = Math.abs(p.metadata.date - t)
          return diff
        })
        // Not match
        if (v > 500) {
          this.photoIdx = -1
          return
        }

        if (this.photoIdx === i) {
          return
        }

        this.photoIdx = i
        if (this.content.stepSuspend) {
          this.$store.dispatch('pause')
        }
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
    position: relative;

    img {
      width: 100%;
      height: auto;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>
