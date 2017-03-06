<template lang="pug">
  div.landing-page-view
    content-view-group.content-view-group(v-bind:contents="contents")
    sequences-panel.sequences-panel(v-bind:contents="contents")
</template>

<script>
  import { mapGetters } from 'vuex'
  import ContentViewGroup from './LandingPageView/ContentViewGroup'
  import SequencesPanel from './LandingPageView/SequencesPanel'
  export default {
    components: {
      ContentViewGroup,
      SequencesPanel
    },
    name: 'landing-page',
    // data () {
    //   return {
    //     contents: [
    //       {
    //         type: 'video',
    //         video: {
    //           src: 'http://www.gomplayer.jp/img/sample/mp4_h264_aac.mp4'
    //         }
    //       },
    //       {
    //         type: 'photo',
    //         photos: [
    //           {
    //             src: 'file:///Users/tmaruyama/Documents/wrc-odaiba-20170303/IMG_1001.JPG'
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // },
    computed: mapGetters({
      contents: 'contents'
    })
  }
</script>

<style scoped lang="scss">
  .landing-page-view {
    width: 100%;
    height: 100%;

    .content-view-group {
      width: 100%;
      height: 80%;
    }
    .sequences-panel {
      width: 100%;
      height: 20%;
    }
  }
</style>
