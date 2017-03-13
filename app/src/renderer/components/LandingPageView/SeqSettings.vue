<template lang="pug">
  div.seq-settings
    el-dialog(title="Settings" v-model="visible")
      el-form(ref="form" @submit="disableFormSubmit")
        el-form-item(label="Offset", :label-width="formLabelWidth")
          el-input(v-model="offset")
      span.dialog-footer(slot="footer")
        el-button(@click="cancel") Cancel
        el-button(type="primary", @click="ok") OK

</template>

<script>
  export default {
    props: ['content', 'visible'],
    data () {
      return {
        offset: 0,
        formLabelWidth: '120px'
      }
    },
    created () {
      this.offset = this.content.offset
    },
    methods: {
      disableFormSubmit () {
        return false
      },
      cancel () {
        this.$emit('cancel')
      },
      ok () {
        this.$emit('submit', {
          offset: parseFloat(this.offset)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .seq-controller {
    width: 100%;
  }
</style>
