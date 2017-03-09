<template lang="pug">
  div.seqs-panel
    div.controls
      seq-controller.controller(v-bind:playing="playing")
      new-seq-panel.new-seq-panel
    seek-bar.seek-bar(:current-time="currentTime", :duration="duration", :startAt="startAt")
    div.seqs
      sequence.sequence(v-for="content in contents", :duration="duration", :startAt="startAt", :content="content")


</template>

<script>
  import SeqController from './SeqController'
  import SeekBar from './SeekBar'
  import Sequence from './Sequence'
  import NewSeqPanel from './NewSeqPanel'
  export default {
    components: {
      SeqController,
      SeekBar,
      NewSeqPanel,
      Sequence
    },
    props: ['contents', 'playing', 'currentTime', 'duration', 'startAt']
  }
</script>

<style scoped lang="scss">
  .seqs-panel {
    width: 100%;
    background-color: #333;
  }
  .sequence {
    height: 52px;
  }
  .controls {
    display: flex;
    flex-display: row;
    .controller {
      width: 30%;
      height: 40px;
    }
    .new-seq-panel {
      width: 70%;
      vertical-align: bottom;
      height: auto;
      min-height: 48px;
    }
  }
  .seek-bar {
    margin-left: 24px;
    width: calc(100% - 24px);
  }
  .seqs {
    width: 100%;
    height: auto;

    .sequence {
      margin-bottom: 4px;
    }

  }
</style>
