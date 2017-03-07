<template lang="pug">
  div.seqs-panel
    seq-controller.controller(v-bind:playing="playing")
    div.sequence-list
    sequence(v-for="c in contents" v-bind:content="c" v-bind:class="itemClass")
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
    props: ['contents', 'playing'],
    computed: {
      itemClass (content) {
        return {
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .seq-panel {
    width: 100%;
    height: 100%;
    background-color: #cccccc;
  }
  .sequence-list {
    height: auto;
    display: flex;
    flex-direction: column;
  }
  .new-seq-panel {
    vertical-align: bottom;
    position: absolute;
    bottom: 0;
    height: 48px;
  }
  .controller {
    height: 24px;
  }
</style>
