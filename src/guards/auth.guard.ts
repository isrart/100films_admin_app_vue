import Router from 'vue-router';
import firebase from 'firebase';

export default class AuthGuard {
    router: Router;

    constructor(router: Router) {
      this.router = router;
      return this;
    }

    generateGuard() {
      this.router.beforeEach((to, from, next) => {
        const usuario = firebase.auth().currentUser;
        const autorizado = to.matched.some(record => record.meta.autorizado);

        if (autorizado && !usuario) {
          next('login');
        } else {
          next();
        }
      });
    }
}
