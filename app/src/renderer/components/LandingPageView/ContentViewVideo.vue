<template lang="pug">
  video.frame(v-bind:src="content.video.src")
</template>

<script>
  export default {
    props: ['content']
  }
</script>

<style scoped lang="scss">
  .frame {
    width: 100%;
    height: 100%;
  }
</style>
