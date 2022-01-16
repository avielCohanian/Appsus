<template>
  <article>
    <h4>{{ item }}</h4>
    <button @click="removeItem">X</button>
    <button @click="editItem">edit</button>
  </article>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {};
    },
    created() {},
    methods: {
      removeItem() {
        this.$emit('removeItem', this.item.id);
      },
      editItem() {
        this.$router.push('/item/' + this.item.id);
      },
    },
  };
</script>

<style></style>
