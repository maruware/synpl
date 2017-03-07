<template lang="pug">
  div.seqs-panel
    seq-controller.controller(v-bind:playing="playing")
    sequence.sequence(:current-time="currentTime", :duration="duration")
    new-seq-panel.new-seq-panel

</template>

<script>
  import SeqController from './SeqController'
  import Sequence from './Sequence'
  import NewSeqPanel from './NewSeqPanel'
  export default {
    components: {
      SeqController,
      Sequence,
      NewSeqPanel
    },
    props: ['contents', 'playing', 'currentTime', 'duration'],
    computed: {
      itemClass (content) {
        return {
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .seqs-panel {
    width: 100%;
    background-color: #cccccc;
  }
  .controller {
    height: 40px;
  }
  .sequence {
    height: 52px;
  }
  .new-seq-panel {
    vertical-align: bottom;
    height: auto;
    min-height: 48px;
  }
</style>
