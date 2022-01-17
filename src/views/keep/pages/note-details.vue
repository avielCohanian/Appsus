<template>
  <section class="edit-note" :class="note.style.backgroundColor">
    <component
      :is="note.type"
      :info="note.info"
      :bcg="note.style"
      :id="note.id"
      @update="update"
      @addPinned="addPinned"
      @addList="addList"
      @addTube="addTube"
      @removeTodo="removeTodo"
      @closeModal="closeModal"
    >
    </component>
  </section>
</template>

<script>
  import noteTxt from '../cmps/previews/noteTxt.vue';
  import noteImg from '../cmps/previews/note-img.vue';
  // import slectBox from '../cmps/cmps-preview/select-box.cmp.js';
  import noteTodos from '../cmps/previews/noteTodos.vue';
  import noteTube from '../cmps/previews/noteTube.vue';
  import { noteService } from '../service/keep-service.js';
  import { eventBus } from '../../../service/event-bus-service.js';

  export default {
    props: ['note'],
    data() {
      return {};
    },
    created() {},
    methods: {
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
    },
    components: {
      noteTxt,
      noteImg,
      noteTodos,
      // slectBox,
      noteTube,
    },
  };
</script>

<style></style>
