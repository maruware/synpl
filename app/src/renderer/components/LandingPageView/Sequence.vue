<template lang="pug">

div.sequence
  div.range(v-for="range in ranges", :style="range.style")
</template>

<script>
  export default {
    props: ['content', 'duration', 'startAt'],
    computed: {
      ranges () {
        if (this.content.type === 'video') {
          const m = this.content.video.metadata
          const leftPercent = (m.date - this.startAt) * 100 / 1000 / this.duration
          const widthPercent = m.duration * 100 / this.duration
          return [{
            style: {
              left: `${leftPercent}%`,
              width: `${widthPercent}%`
            }
          }]
        }
        if (this.content.type === 'photo') {
          return this.content.photos.map(p => {
            const leftPercent = (p.metadata.date - this.startAt) * 100 / 1000 / this.duration
            return {
              style: {
                'left': `${leftPercent}%`,
                width: '2px'
              }
            }
          })
        }
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="scss">

.sequence {
  width: 100%;
  height: 24px;
  background-color: #91BED4;
  // display: table-cell;
  // vertical-align: middle;
  position: relative;
}
.range {
  top: 25%;
  position: absolute;
  background-color: #304269;
  height: 50%;
}
</style>
