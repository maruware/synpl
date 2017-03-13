<template lang="pug">
  div._new-seq-panel(@dragenter="enter", @dragover="dragging", @drop="dropped", @dragleave="leave")
    div.dash-line
      span(v-if="!isDragging")
        span(v-if="noContents") Drag video or youtube here
        span(v-else) Drag photos here
      span(v-else) Drop
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        isDragging: false
      }
    },
    computed: mapGetters({
      noContents: 'noContents'
    }),
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
            return this.$store.dispatch('setContent', { text, date })
          })
        } else {
          const files = e.dataTransfer.files
          console.log('files', files)
          contentPromise = this.$store.dispatch('setContent', { files })
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

    position: relative;

    .dash-line {
      position: absolute;
      box-sizing:border-box;
      left: 2px;
      top: 2px;
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      border: dashed 1px;
    }

    span {
      height: 100%;
      vertical-align: middle;
    }

  }
</style>
