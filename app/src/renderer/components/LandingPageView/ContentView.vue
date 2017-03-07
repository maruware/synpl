<template lang="pug">
  div.content-box
    content-view-video(v-if="isVideo", v-bind:content="content" v-bind:current-time="currentTime" v-bind:start-at="startAt" v-bind:duration="duration")
    content-view-photo(v-if="isPhoto", v-bind:content="content" v-bind:current-time="currentTime" v-bind:start-at="startAt" v-bind:duration="duration")
</template>

<script>
  import ContentViewVideo from './ContentViewVideo'
  import ContentViewPhoto from './ContentViewPhoto'
  export default {
    components: {
      ContentViewVideo,
      ContentViewPhoto
    },
    props: ['content', 'currentTime', 'startAt', 'duration'],
    computed: {
      isVideo: function () {
        return this.content.type === 'video'
      },
      isPhoto: function () {
        return this.content.type === 'photo'
      }
    }
  }
</script>

<style scoped lang="scss">
  .content-box {
    width: 100%;
    height: 100%;
    background: #555555;

    p {
      color: white;
    }
  }
</style>
