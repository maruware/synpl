<template lang="pug">
  div.frame
    img(v-bind:src="content.photos[0].src")
</template>

<script>
  export default {
    props: ['content', 'time'],
    computed: {
      current () {
        return this.content.photos[0].src
      }
    }
  }
</script>

<style scoped lang="scss">
  .frame {
    width: 100%;
    height: 100%;

    vertical-align: middle;

    img {
      width: 100%;
    }
  }
</style>
