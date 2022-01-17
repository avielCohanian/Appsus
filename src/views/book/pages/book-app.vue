<template>
  <section class="book-app">
    <book-filter @filtered="setFilter" />
    <book-list :books="booksToShow" @selected="selectBook" />
  </section>
</template>

<script>
  import bookFilter from '../cmps/book-filter.vue';
  import bookList from '../cmps/book-list.vue';
  import { bookService } from '../services/book-service.js';
  export default {
    data() {
      return {
        books: null,
        selectedBook: null,
        filterBy: null,
      };
    },
    created() {
      this.loadBooks();
    },
    methods: {
      loadBooks() {
        bookService.query().then((books) => {
          this.books = books;
        });
      },
      selectBook(book) {
        this.selectedBook = book;
      },
      closeDetails() {
        this.selectedBook = null;
      },
      setFilter(filterBy) {
        this.filterBy = filterBy;
      },
    },
    computed: {
      booksToShow() {
        if (!this.filterBy) return this.books;

        const searchStr = this.filterBy.title.toLowerCase();
        var booksToDisplay = this.books.filter((book) => {
          return book.title.toLowerCase().includes(searchStr);
        });
        const searchMin = this.filterBy.minPrice ? this.filterBy.minPrice : 0;
        booksToDisplay = booksToDisplay.filter((book) => {
          return book.listPrice.amount > searchMin;
        });
        const searchMax = this.filterBy.maxPrice ? this.filterBy.maxPrice : Infinity;
        booksToDisplay = booksToDisplay.filter((book) => {
          return book.listPrice.amount < searchMax;
        });
        return booksToDisplay;
      },
    },

    components: {
      bookList,
      bookFilter,
    },
  };
</script>

<style></style>
