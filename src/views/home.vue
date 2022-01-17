<template>
  <div
    class="home"
    :style="{
      'background-image': 'url(' + img + ')',
    }"
  >
    <div class="container">
      <h1>Welcome To Appsus</h1>
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
