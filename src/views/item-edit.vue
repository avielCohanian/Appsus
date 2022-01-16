<template>
  <article>
    <h3>{{ title }}</h3>
    {{ itemEdit }}
    <button @click="back">back</button>
  </article>
</template>

<script>
  import { itemService } from '../service/item.service';
  export default {
    data() {
      return {
        itemEdit: null,
      };
    },
    async created() {
      try {
        if (this.itemId) {
          const item = await itemService.getById(this.itemId);
          this.itemEdit = JSON.parse(JSON.stringify(item));
        } else {
          // this.itemEdit = itemService.getEmptyItem();
        }
      } catch (err) {
        console.log(err);
      }
    },
    methods: {
      save() {
        let item = JSON.parse(JSON.stringify(this.itemEdit));
        if (this.itemId) {
          this.$store.dispatch({ type: 'updateItem', item }).then(() => {
            this.$router.push('/item');
          });
        } else {
          this.$store.dispatch({ type: 'saveItem', item }).then(() => {
            this.$router.push('/item');
          });
        }
      },
      back() {
        this.$router.push('/item');
      },
    },
    computed: {
      title() {
        return this.itemId ? 'Item Edit' : 'Item Add';
      },
      itemId() {
        return this.$route.params.itemId;
      },
    },
  };
</script>

<style></style>
