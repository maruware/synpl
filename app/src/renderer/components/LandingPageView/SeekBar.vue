<template lang="pug">
div.seq
  input.seq-slider(type="range", :value="sliderVal", @change="changedSlider", :disabled="!enableSlider", :max="max")

</template>

<script>
  export default {
    components: {
    },
    props: ['content', 'currentTime', 'duration'],
    data () {
      return {
        max: 600
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
  .seq {
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
