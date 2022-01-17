<template>
  <ul class="book-list">
    <li v-for="book in books" :key="book.id" class="book-preview-container" @click="select(book)">
      <book-preview :book="book" @click.native="setDetails(book.id)" />
    </li>
  </ul>
</template>

<script>
  import bookPreview from './book-preview.vue';
  export default {
    props: ['books'],
    methods: {
      remove(bookId) {
        this.$emit('remove', bookId);
      },
      select(book) {
        this.$emit('selected', book);
      },
      log() {
        console.log('Logging.....');
      },
      setDetails(id) {
        this.$router.push(`/book/${id}`);
      },
    },

    components: {
      bookPreview,
    },
  };
</script>

<style></style>
