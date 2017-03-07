<template lang="pug">
  div.landing-page-view
    content-view-group.content-view-group(v-bind:contents="contents" v-bind:current-time="currentTime")
    sequences-panel.sequences-panel(v-bind:contents="contents" v-bind:current-time="currentTime" v-bind:playing="playing")
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
    computed: mapGetters({
      contents: 'contents',
      currentTime: 'currentTime',
      playing: 'playing'
    })
  }
</script>

<style scoped lang="scss">
  .landing-page-view {
    width: 100%;
    height: 100%;

    .content-view-group {
      width: 100%;
      height: 70%;
    }
    .sequences-panel {
      width: 100%;
      height: 30%;
    }
  }
</style>
