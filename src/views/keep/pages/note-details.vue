<template>
  <section class="edit-note" :style="{ 'background-color': note.style.backgroundColor }">
    <div class="note-cmp-smart">
      <i class="fas fa-thumbtack" @click="addPinned"></i>
      <i class="fas fa-backspace" @click="closeModal" title="back"></i>
    </div>

    <component
      :is="note.type"
      :info="note.info"
      :bcg="note.style"
      :id="note.id"
      @update="update"
      @addTube="addTube"
      @removeTodo="removeTodo"
    >
    </component>

    <div class="txt-cmp-edit">
      <i class="fab fa-youtube" for="youtube" @click="search(beatles)"></i>
      <i class="fas fa-list" for="list" @click="addList"></i>
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

      <label class="far fa-image" for="id">
        <input id="id" type="file" :name="note.id" @change="onImgInput" hidden />
      </label>
    </div>
  </section>
</template>

<script>
  import noteTxt from '../cmps/previews/noteTxt.vue';
  import noteImg from '../cmps/previews/note-img.vue';
  import noteTodos from '../cmps/previews/noteTodos.vue';
  import noteTube from '../cmps/previews/noteTube.vue';
  import { noteService } from '../service/keep-service.js';
  import { eventBus } from '../../../service/event-bus-service.js';

  export default {
    props: ['note'],
    data() {
      return { isColorOpen: false };
    },
    created() {},
    methods: {
      selectColor(event) {
        this.note.style.backgroundColor = event.target.style.backgroundColor;
        this.isColorOpen = !this.isColorOpen;
        this.update();
      },
      update() {
        noteService.updateNote(this.note).then(() => eventBus.$emit('updating'));
      },
      save() {
        console.log('Survey Answers', this.answers);
      },
      closeModal() {
        this.$emit('closeModal');
      },
      removeTodo(idx) {
        this.note.info.todos.splice(idx, 1);
        this.update();
      },
      addList() {
        this.note.type = 'noteTodos';
        this.update();
      },
      addTube() {
        this.note.type = 'noteTube';
        this.update();
      },
      addPinned() {
        this.note.isPinned = !this.note.isPinned;
        this.update();
      },
      search(val) {
        this.$emit('addTube');
        noteService.getYoutubeVid(val).then(this.renderVideos);
      },
      renderVideos(videos) {
        var firstVid = videos[0].id.videoId;
        this.onSelectedVid(firstVid);
      },
      onSelectedVid(id) {
        this.src = `https://www.youtube.com/embed/${id}`;
        this.note.info.tube = this.src;
        this.update();
      },
      onImgInput(e) {
        const file = e.target.files[0];
        this.note.info.url = URL.createObjectURL(file);
        this.update();
      },
    },
    computed: {
      color() {
        return this.note.style.backgroundColor;
      },
    },
    components: {
      noteTxt,
      noteImg,
      noteTodos,
      noteTube,
    },
  };
</script>

<style></style>
