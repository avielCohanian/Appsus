<template>
  <ul v-if="items">
    <li v-for="item in items" :key="item.id">
      <item-preview :item="item" @removeItem="removeItem" />
    </li>
  </ul>
</template>

<script>
  import itemPreview from './item-preview.vue';
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {};
    },
    created() {},
    methods: {
      removeItem(itemId) {
        this.$emit('removeItem', itemId);
      },
    },
    components: { itemPreview },
  };
</script>

<style></style>
