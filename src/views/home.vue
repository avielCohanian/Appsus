<template>
  <div
    class="home"
    :style="{
      'background-image': 'url(' + img + ')',
    }"
  >
    <div class="container">
      <h1>Welcome To Appsus</h1>

      <div class="routs">
        <router-link to="/mail">Mail</router-link>
        <router-link to="/keep">Keep</router-link>
        <router-link to="/book">Book</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        img: require('@/assets/img/bcimg.jpg'),
      };
    },
    components: {},
  };
</script>
