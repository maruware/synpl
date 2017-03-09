<template lang="pug">
div.seq
  input.seq-slider(type="range", :value="sliderVal", @input="changedSlider", :disabled="!enableSlider", :max="max")
  div.time-labels
    span.start-at-label {{ startAtText }}
    span.end-at-label {{ endAtText }}

</template>

<script>
  import moment from 'moment'
  export default {
    components: {
    },
    props: ['content', 'currentTime', 'duration', 'startAt'],
    data () {
      return {
        max: 2000
      }
    },
    computed: {
      enableSlider () {
        console.log('this.duration', this.duration)
        return this.duration > 0
      },
      sliderVal () {
        if (this.duration === 0) {
          return 0
        }
        return Math.round(this.currentTime * this.max / this.duration)
      },
      startAtText () {
        console.log('startAtText', this.startAt)
        return this.startAt ? moment(this.startAt).format() : null
      },
      endAtText () {
        if (!this.startAt) {
          return null
        }
        const t = new Date(this.startAt.getTime() + this.duration * 1000)
        return moment(t).format()
      }
    },
    methods: {
      changedSlider (e) {
        const percent = e.target.value
        this.$store.dispatch('seek', this.duration * percent / this.max)
      }
    }
  }
</script>

<style scoped lang="scss">
  .time-labels {
    position: relative;
    color: #eee;
    .end-at-label {
      position: absolute;
      right: 0px;
    }
  }

  $tack-bg: #efefef;

  input[type=range].seq-slider {
    -webkit-appearance: none;
    width: 100%;
    margin: 8.6px 0;
  }
  input[type=range].seq-slider:focus {
    outline: none;
  }
  input[type=range].seq-slider:disabled {
    opacity: 0.3;
  }
  input[type=range].seq-slider::-webkit-slider-runnable-track {
    width: 100%;
    height: 6.8px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #aaaaaa, 0px 0px 1px #b7b7b7;
    background: $tack-bg;
    border-radius: 15.8px;
    border: 0px solid #010101;
  }
  input[type=range].seq-slider::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #aaaaaa, 0px 0px 1px #b7b7b7;
    border: 1px solid #555555;
    height: 24px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -8.6px;
  }
  input[type=range].seq-slider:focus::-webkit-slider-runnable-track {
    background: #05d8d8;
  }
  input[type=range].seq-slider::-moz-range-track {
    width: 100%;
    height: 6.8px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #aaaaaa, 0px 0px 1px #b7b7b7;
    background: $tack-bg;
    border-radius: 15.8px;
    border: 0px solid #010101;
  }
  input[type=range].seq-slider::-moz-range-thumb {
    box-shadow: 1px 1px 1px #aaaaaa, 0px 0px 1px #b7b7b7;
    border: 1px solid #555555;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type=range].seq-slider::-ms-track {
    width: 100%;
    height: 6.8px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  input[type=range].seq-slider::-ms-fill-lower {
    background: #03a6a6;
    border: 0px solid #010101;
    border-radius: 31.6px;
    box-shadow: 1px 1px 1px #aaaaaa, 0px 0px 1px #b7b7b7;
  }
  input[type=range].seq-slider::-ms-fill-upper {
    background: $tack-bg;
    border: 0px solid #010101;
    border-radius: 31.6px;
    box-shadow: 1px 1px 1px #aaaaaa, 0px 0px 1px #b7b7b7;
  }
  input[type=range].seq-slider::-ms-thumb {
    box-shadow: 1px 1px 1px #aaaaaa, 0px 0px 1px #b7b7b7;
    border: 1px solid #555555;
    height: 24px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
    height: 6.8px;
  }
  input[type=range].seq-slider:focus::-ms-fill-lower {
    background: $tack-bg;
  }
  input[type=range].seq-slider:focus::-ms-fill-upper {
    background: #05d8d8;
  }


</style>
