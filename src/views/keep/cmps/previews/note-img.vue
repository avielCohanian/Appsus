<template>
  <div class="img-cmp cmp-smart">
    <a @click="closeModal" title="back">X</a>

    <img v-if="info.url" :src="info.url" alt="" />

    <input :class="color" type="text" v-model="info.txt" @blur="update" />

    <select :class="color" v-model="bcg.backgroundColor" @change="update">
      <option>white</option>
      <option>coral</option>
      <option>pink</option>
      <option>blue</option>
      <option>green</option>
      <option>yellow</option>
    </select>
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
      closeModal() {
        this.$emit('closeModal');
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
