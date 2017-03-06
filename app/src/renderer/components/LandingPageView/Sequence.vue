<template lang="pug">
div.seq
  div.prop-panel
    p {{ content.type }}
  div.seq-panel
</template>

<script>
  export default {
    components: {
    },
    props: ['content'],
    computed: {
    }
  }
</script>

<style scoped lang="scss">
  .seq {
    height: 50%;
  }
  .prop-panel {
    width: 48px;
    height: 100%;
  }
  .seq-panel {
    width: 200px;
    height: 100%;
  }
</style>
