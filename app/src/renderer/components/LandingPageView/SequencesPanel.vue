<template lang="pug">
  div.seqs-panel
    sequence(v-for="c in contents" v-bind:content="c" v-bind:class="itemClass")
    new-seq-panel

</template>

<script>
  import Sequence from './Sequence'
  import NewSeqPanel from './NewSeqPanel'
  export default {
    components: {
      Sequence,
      NewSeqPanel
    },
    props: ['contents'],
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

    display: flex;
    flex-direction: column;
  }
</style>
