<template>
  <div id="app">
    <section class="container">
      <app-header />
      <user-msg />
      <router-view class="router-view" />
      <app-footer />
    </section>
  </div>
</template>
<script>
  import appHeader from './cmp/app-header.vue';
  import appFooter from './cmp/app-header.vue';
  import userMsg from './cmp/user-msg.vue';

  export default {
    data() {
      return {};
    },
    async created() {
      // await this.$store.dispatch({ type: 'loadItem' });
    },
    components: {
      appHeader,
      appFooter,
      userMsg,
    },
  };
</script>
<style lang="scss"></style>
