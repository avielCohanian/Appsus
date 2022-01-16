<template>
  <section>
    <ul class="note-list main-app">
      <li v-for="note in notes" :key="note.id" class="notes-preview-container">
        <note-preview :note="note" @remove="remove(note.id)" @openEdit="openEdit" @save="save" @click="scrollMeTo()" />
      </li>
    </ul>
    <note-details class="note-details" v-if="currNote" :note="currNote" @closeModal="closeEdit"></note-details>
  </section>
</template>

<script>
  import notePreview from './note-preview.vue';
  import noteDetails from '../pages/note-details.vue';
  import { noteService } from '../service/keep-service.js';

  export default {
    props: ['notes'],
    data() {
      return {
        currNote: null,
      };
    },
    methods: {
      selected(id) {
        this.$emit('selected', id);
      },
      remove(noteId) {
        this.$emit('remove', noteId);
      },
      openEdit(noteId) {
        noteService.getById(noteId).then((note) => {
          this.currNote = note;
        });
      },
      closeEdit() {
        this.currNote = null;
      },
      save(note) {
        noteService.save(note).then(console.log(this.notes));
      },
    },
    components: {
      notePreview,
      noteDetails,
      noteService,
    },
  };
</script>

<style></style>
