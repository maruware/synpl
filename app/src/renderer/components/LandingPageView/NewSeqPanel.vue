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
        console.log('fileDropped', e.dataTransfer.getData('Text'))
        e.stopPropagation()
        e.preventDefault()

        const text = e.dataTransfer.getData('Text')
        if (text) {
          this.$prompt('Input date', 'Tip', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel'
          })
          .then(r => {
            const date = new Date(r.value)
            this.$store.dispatch('setContentWithText', { text, date })
          })
        } else {
          const files = e.dataTransfer.files
          console.log('files', files)
          this.$store.dispatch('setContentWithFiles', files)
        }
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
