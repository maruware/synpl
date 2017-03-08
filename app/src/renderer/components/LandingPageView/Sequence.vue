<template lang="pug">

div.sequence
  div.seq-label
    | {{ content.idx }}
  div.seq-timeline
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
  background-color: #555;

  display: flex;
  flex-direction: row;
}
.range {
  top: 25%;
  position: absolute;
  background-color: #151515;
  height: 50%;
}

.seq-label {
  width: 20px;
  margin-left: 4px;
  // color: #fff;
}

.seq-timeline {
  width: 100%;
  // background-color: #91BED4;
  position: relative;
}
</style>
