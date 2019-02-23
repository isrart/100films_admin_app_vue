<template>
  <div>
    <md-field :class="showError">
      <label>{{ title }}</label>
      <md-input :type='type' v-model='value' @blur='blur'></md-input>
      <span  class="md-error">Error</span>
    </md-field>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      value: '',
      isDirty: false
    };
  },
  props: {
    title: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    defaultValue: {
      type: String,
      required: false,
    },
    isValid: {
      type: Object,
      required: false
    }
  },
  watch: {
    // value: (newValue: any, oldValue: any): void => this.$emit('newValue', newValue)
    value(newValue, oldValue) {
      this.isDirty = true;
      this.$emit('changeValue', newValue);
    },
  },
  methods: {
    blur() {
      if (this.isDirty) {
        this.isValid.$touch();
      }
    }
  },
  computed: {
    showError () {
      if (!this.isValid) {
        return {
          'md-invalid' : false
        }
      } else if (this.isValid && this.isValid.$invalid && this.isValid.$dirty) {
        return {
          'md-invalid' : true
        }
      } else {
        return {
          'md-invalid' : false
        }
      }
    }
  },
  created() {
    this.value = this.defaultValue;
  },
});
</script>
