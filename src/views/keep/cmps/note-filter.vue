<template>
  <div class="note-filter">
    <button @click="filter">Search</button>

    <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search..." />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        filterBy: {
          title: '',
        },
      };
    },
    methods: {
      filter() {
        this.$emit('filtered', { ...this.filterBy });
      },
    },
  };
</script>

<style></style>
