<template>
  <div>
    <b-container class='bv-example-row'>
      <b-row>
        <b-col>
          <my-input
            :title='inputMail.title'
            :type='inputMail.type'
            :defaultValue='form.mail'
            :isValid='$v.form.mail'
            v-model='form.mail'
            @changeValue='updateMail($event)'
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <my-input
            :title='inputPassword.title'
            :type='inputPassword.type'
            :defaultValue='form.password'
            v-model='form.password'
            @changeValue='updatePassword($event)'
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <my-button @click='submit'/>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal1" hide-footer title="BootstrapVue">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import myInput from '@/components/Input.vue';
import myButton from '@/components/Button.vue';
import firebase from 'firebase';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default Vue.extend({
  name: 'LoginPage',
  mixins: [validationMixin],
  components: {
    myInput,
    myButton,
  },
  data() {
    return {
      inputMail: {
        title: 'E-mail',
        type: 'mail',
      },
      inputPassword: {
        title: 'Password',
        type: 'password',
      },
      form: {
        mail: '',
        password: '123456',
      },
    };
  },
  validations: {
    form: {
      mail: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    updateMail(newValue: any) {
      this.form.mail = newValue;
    },
    updatePassword(newValue: any) {
      this.form.password = newValue;
    },
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.mail, this.form.password)
        .then(
          (res) => {},
          error => this.$root.$emit('bv::show::modal', 'modal1'),
        );
    },
  },
});
</script>

<style scoped lang='scss'>
</style>
