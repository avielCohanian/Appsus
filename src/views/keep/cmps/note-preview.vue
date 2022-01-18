<template>
  <section
    class="note-preview"
    :style="{ 'background-color': bcg }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="openEdit(note.id)"
  >
    <div class="note-preview-icons">
      <i v-show="hover || note.isPinned" class="fas fa-thumbtack" @click.stop="thumbtack"></i>

      <i v-show="hover" class="fas fa-backspace" @click.stop="remove"></i>
    </div>

    <div class="note-preview-container">
      <div class="tube">
        <iframe v-if="note.info.tube" :src="note.info.tube"> </iframe>
      </div>
      <img v-if="note.info.url" :src="note.info.url" :id="note.id" />

      <strong v-show="note.info.title">{{ note.info.title }}</strong>

      <p v-show="note.info.subtitle">{{ note.info.subtitle }}</p>

      <ul v-show="note.info.todos">
        <li v-for="(todo, idx) in note.info.todos" :key="idx">
          <span :class="{ done: todo.doneAt }">{{ todo.txt }}</span>
          <i class="fas fa-times"></i>
        </li>
      </ul>
    </div>
    <div v-show="hover" class="note-preview-edit" @click.stop>
      <i class="fab fa-youtube" for="youtube" @click="openEdit(note.id)"></i>

      <i class="fas fa-list" for="list" @click="openEdit(note.id)"></i>

      <i class="fab fa-autoprefixer" for="palette"></i>

      <div class="palette" v-if="isColorOpen" @click="selectColor">
        <div style="background-color: white"></div>
        <div style="background-color: #9c27b0b8"></div>
        <div style="background-color: lightgreen"></div>
        <div style="background-color: lightsteelblue"></div>
        <div style="background-color: lightpink"></div>
        <div style="background-color: coral"></div>
      </div>

      <label class="fas fa-palette" :for="note.id" @click="isColorOpen = !isColorOpen"></label>

      <i class="far fa-image" for="palette" @click="openEdit(note.id)"></i>
    </div>
  </section>
</template>

<script>
  import { noteService } from '../service/keep-service.js';

  export default {
    props: ['note'],
    data() {
      return {
        answers: [],
        currNote: null,
        color: 'white',
        hover: false,
        isColorOpen: false,
      };
    },
    created() {
      this.currNote = this.note;
    },
    methods: {
      selectColor(event) {
        this.note.style.backgroundColor = event.target.style.backgroundColor;
        this.isColorOpen = !this.isColorOpen;
        this.save();
      },
      onImgInput(e) {
        const file = e.target.files[0];
        this.note.info.url = URL.createObjectURL(file);
        this.save();
      },
      setInput(ev) {
        this.answers = ev;
      },
      save() {
        this.$emit('save', this.note);
      },
      remove() {
        this.$emit('remove');
      },
      openEdit(noteId) {
        this.$emit('openEdit', noteId);
      },
      addList() {
        this.note.type = 'noteTodos';
        this.save();
      },
      thumbtack() {
        this.note.isPinned = !this.note.isPinned;
        this.save();
      },
      search(val) {
        this.note.type = 'noteTube';
        noteService.getYoutubeVid(val).then(this.renderVideos);
      },
      renderVideos(videos) {
        var firstVid = videos[0].id.videoId;
        this.onSelectedVid(firstVid);
      },
      onSelectedVid(id) {
        this.note.info.tube = `https://www.youtube.com/embed/${id}`;
        this.save(this.note);
      },
    },
    computed: {
      bcg() {
        const currColor = this.note.style.backgroundColor;
        return currColor;
        return {
          white: currColor === 'white',
          coral: currColor === 'coral',
          pink: currColor === 'pink',
          blue: currColor === 'blue',
          green: currColor === 'green',
          yellow: currColor === 'yellow',
        };
      },
    },
  };
</script>

<style></style>
