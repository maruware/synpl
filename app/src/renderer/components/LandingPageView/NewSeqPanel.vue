<template lang="pug">
  div._new-seq-panel(v-on:dragover="fileDragging" v-on:drop="fileDropped")
    p Drag video or photos here
</template>

<script>
  export default {
    computed: {

    },
    methods: {
      fileDragging (e) {
        e.stopPropagation()
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
      },
      fileDropped (e) {
        e.stopPropagation()
        e.preventDefault()

        const files = e.dataTransfer.files
        console.log('files', files)
        this.$store.dispatch('setContent', files)
      }
    }
  }
</script>

<style scoped lang="scss">
  ._new-seq-panel {
    width: 100%;
    background-color: #aaaaaa;

    text-align: center;
    font-size: 20pt;
    color: #555555;
  }
</style>
