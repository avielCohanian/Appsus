<template>
  <div class="img-cmp cmp-smart">
    <img v-if="info.url" :src="info.url" alt="" />

    <input :class="color" type="text" v-model="info.txt" @blur="update" />
  </div>
</template>

<script>
  export default {
    props: ['info', 'bcg', 'id'],
    data() {
      return {
        txt: '',
      };
    },
    methods: {
      update() {
        this.$emit('update', this.info, this.bcg);
      },
    },
    computed: {
      color() {
        return this.bcg.backgroundColor;
      },
    },
  };
</script>

<style></style>
