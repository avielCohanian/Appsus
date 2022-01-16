<template>
  <section>
    <h1>vue-app</h1>
    <!-- <item-list v-if="items" :items="items" @removeItem="removeItem" /> -->
  </section>
</template>

<script>
  import itemList from '../cmp/item-list.vue';
  // import { itemService } from '../service/item.service.js';
  export default {
    components: { itemList },
    data() {
      return {};
    },
    created() {},
    computed: {
      items() {
        return this.$store.getters.items;
      },
    },
    methods: {
      removeItem(itemId) {
        this.$store.dispatch({ type: 'removeItem', itemId });
      },
    },
  };
</script>

<style></style>
