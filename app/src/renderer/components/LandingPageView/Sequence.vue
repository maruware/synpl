<template lang="pug">

div.sequence
  div.seq-label
    | {{ content.idx }}
  div.seq-ctrl
    div.seq-btn.pause-switch(v-if="isPhoto", :class="{on: enabledStepSuspend}", @click="toggleStepSuspend")
      i.fa.fa-step-forward
    div.seq-btn.settings-btn(v-if="isPhoto", @click="openSettings")
      i.fa.fa-cog
  div.seq-timeline
    div.range(v-for="range in ranges", :style="range.style")
  seq-settings(:content="content", :visible="settingsVisible", @cancel="cancelSettings", @submit="saveSettings")
</template>

<script>
  import SeqSettings from './SeqSettings'
  export default {
    components: {
      SeqSettings
    },
    props: ['content', 'duration', 'startAt'],
    data () {
      return {
        settingsVisible: false
      }
    },
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
            const offsetMs = this.content.offset * 1000
            const leftPercent = 100 * (p.metadata.date - this.startAt + offsetMs) / (this.duration * 1000)
            return {
              style: {
                'left': `${leftPercent}%`,
                width: '2px'
              }
            }
          })
        }
      },
      isPhoto () {
        return this.content.type === 'photo'
      },
      enabledStepSuspend () {
        return this.content.stepSuspend
      }
    },
    methods: {
      toggleStepSuspend () {
        const contentIdx = this.content.idx
        const enable = !this.content.stepSuspend
        this.$store.dispatch('changeStepSuspend', {contentIdx, enable})
      },
      openSettings () {
        this.settingsVisible = true
      },
      saveSettings (e) {
        const contentIdx = this.content.idx
        this.$store.dispatch('setOffset', {contentIdx, offset: e.offset})
        this.settingsVisible = false
      },
      cancelSettings () {
        this.settingsVisible = false
      }
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
  width: 16px;
  margin-left: 2px;
  // color: #fff;
}

.seq-timeline {
  width: 100%;
  // background-color: #91BED4;
  position: relative;
}

.seq-ctrl {
  width: 38px;
  margin-right: 4px;
  height: 100%;

  display: flex;
  flex-direction: row;

  .seq-btn {
    width: 18px;
    margin-top: 3px;
    height: 18px;
    color: #bbb;
    font-size: 10pt;
    border-radius: 3px;
    text-align: center;
  }

  .pause-switch {
    &.on {
      background-color: #333;
      box-shadow:0px 0px 1px 1px #111 inset;
    }
  }
}
</style>
