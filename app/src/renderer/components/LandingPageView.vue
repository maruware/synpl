<template lang="pug">
  div.landing-page-view
    content-view-group.content-view-group(:contents="contents", :current-time="currentTime", :start-at="startAt", :duration="duration")
    sequences-panel.sequences-panel(:contents="contents", :current-time="currentTime", :playing="playing", :start-at="startAt", :duration="duration")
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
      // margin-bottom: -140px;
      height: 70%;
    }
    .sequences-panel {
      width: 100%;
      height: 30%;
    }
  }
</style>
