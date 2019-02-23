<template>
  <div>
    <md-button @click="clickEvent" class="md-raised">Default</md-button>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  methods: {
    clickEvent() {
      this.$emit('click');
    },
  },
});
</script>
