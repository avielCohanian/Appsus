<template>
  <div class="tube-cmp cmp-smart">
    <div class="tube-cmp-container">
      <div class="tube">
        <iframe v-if="info.tube" :src="info.tube"> </iframe>
      </div>
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
        src: '',
        beatles: 'armin',
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
