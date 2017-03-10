<template lang="pug">
  div._new-seq-panel(@dragenter="enter", @dragover="dragging", @drop="dropped", @dragleave="leave")
    span(v-if="!isDragging") Drag video or photos here
    span(v-else) Drop
</template>

<script>
  export default {
    data () {
      return {
        isDragging: false
      }
    },
    methods: {
      enter (e) {
        e.stopPropagation()
        e.preventDefault()
        this.isDragging = true
      },
      leave (e) {
        e.stopPropagation()
        e.preventDefault()
        this.isDragging = false
      },
      dragging (e) {
        e.stopPropagation()
        e.preventDefault()
        this.isDragging = true
        e.dataTransfer.dropEffect = 'copy'
      },
      dropped (e) {
        e.stopPropagation()
        e.preventDefault()
        this.isDragging = false

        const text = e.dataTransfer.getData('Text')

        let contentPromise = null
        if (text) {
          contentPromise = this.$prompt('Input date', 'Tip', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel'
          })
          .then(r => {
            const date = new Date(r.value)
            return this.$store.dispatch('setContentWithText', { text, date })
          })
        } else {
          const files = e.dataTransfer.files
          console.log('files', files)
          contentPromise = this.$store.dispatch('setContentWithFiles', files)
        }

        contentPromise
        .catch(err => {
          console.error('err', err)
          this.$message.error(err.msg || 'Error')
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  div._new-seq-panel {
    width: 100%;
    background-color: #aaaaaa;

    text-align: center;
    font-size: 20pt;
    color: #555555;

    span {
      height: 100%;
      vertical-align: middle;
    }

  }
</style>
