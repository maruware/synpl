<template lang="pug">
  div.landing-page-view
    content-view-group.content-view-group(v-bind:contents="contents" v-bind:current-time="currentTime" v-bind:start-at="startAt" v-bind:duration="duration")
    sequences-panel.sequences-panel(:contents="contents", :current-time="currentTime", :playing="playing", :duration="duration")
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
      startAt: 'startAt',
      duration: 'duration',
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
      margin-bottom: -140px;
      min-height: 100%;
    }
    .sequences-panel {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 140px;
    }
  }
</style>
