import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../views/home.vue';
import itemApp from '../views/item-app.vue';
import itemEdit from '../views/item-edit.vue';
import mailApp from '../views/mail/pages/email-app.vue';
import mailDetails from '../views/mail/pages/email-details.cmp.vue';
import keepApp from '../views/keep/pages/note-app.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/mail',
    component: mailApp,
  },
  {
    path: '/keep',
    component: keepApp,
  },
  {
    path: '/mail/:mailId',
    component: mailDetails,
  },
  {
    path: '/item',
    name: 'item',
    component: itemApp,
  },
  {
    path: '/item/:itemId',
    name: 'edit',
    component: itemEdit,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
