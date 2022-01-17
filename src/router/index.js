import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../views/home.vue';
import itemApp from '../views/item-app.vue';
import itemEdit from '../views/item-edit.vue';
import mailApp from '../views/mail/pages/email-app.vue';
import mailDetails from '../views/mail/pages/email-details.cmp.vue';
import keepApp from '../views/keep/pages/note-app.vue';
import bookApp from '../views/book/pages/book-app.vue';
import bookAdd from '../views/book/cmps/book-add.vue';
import bookDetails from '../views/book/pages/book-details.vue';

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
  {
    path: '/book',
    name: 'book',
    component: bookApp,
  },
  {
    path: '/book/add',
    component: bookAdd,
  },
  {
    path: '/book/:bookId',
    component: bookDetails,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
