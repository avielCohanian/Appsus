<template>
  <div class="txt-cmp cmp-smart">
    <div class="txt-cmp-container">
      <img v-if="info.url" :src="info.url" :id="id" />
      <input
        :style="{ 'background-color': color }"
        type="text"
        v-model="info.title"
        @input="update"
        placeholder="title"
      />

      <input
        :style="{ 'background-color': color }"
        type="text"
        v-model="info.subtitle"
        @input="update"
        placeholder="Note txt"
      />
    </div>
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
    created() {},
    methods: {
      update() {
        this.$emit('update');
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
