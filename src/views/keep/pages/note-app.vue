<template>
  <section class="app-note main-layout" v-if="notes">
    <div class="new-note-edit">
      <input class="new-note-title" v-model="newNote.info.title" type="text" placeholder="Title" v-show="editNewNote" />

      <div class="start-show">
        <input v-model="newNote.info.subtitle" type="text" placeholder="write a note" @click="longNote" />
        <i class="fas fa-plus" @click="add" v-if="editNewNote"></i>
      </div>

      <div class="search-tube" v-show="isTubeMode">
        <input class="new-note-tube" type="text" placeholder="Search in youtube" v-model="searchTubeMode" />
        <i class="fas fa-search" @click="search"></i>
      </div>

      <div class="icons-new-note" v-show="editNewNote">
        <div class="palette" v-if="isColorOpen" @click="selectColor">
          <div style="background-color: white"></div>
          <div style="background-color: #9c27b0b8"></div>
          <div style="background-color: lightgreen"></div>
          <div style="background-color: lightsteelblue"></div>
          <div style="background-color: lightpink"></div>
          <div style="background-color: coral"></div>
        </div>

        <label class="fas fa-palette" @click="isColorOpen = !isColorOpen"></label>

        <i class="fab fa-youtube" for="youtube" @click="tubeMode"></i>

        <i class="fas fa-list" for="list"></i>
        <i class="fab fa-autoprefixer" for="palette"></i>

        <label class="far fa-image" for="file">
          <input id="file" type="file" name="image" @change="onImgInput" hidden />
        </label>

        <img v-if="newNote.info.url" :src="newNote.info.url" />
      </div>
    </div>

    <note-list :notes="notesToShow" @selected="selectNote" @remove="removeNote" @update="update"></note-list>
  </section>
</template>

<script>
  import { eventBus } from '../../../service/event-bus-service';
  import noteList from '../cmps/note-list.vue';
  import { noteService } from '../service/keep-service';

  export default {
    data() {
      return {
        notes: null,
        filterBy: null,
        newNote: null,
        editNewNote: false,
        isTubeMode: false,
        searchTubeMode: '',
        isColorOpen: false,
      };
    },
    created() {
      this.loadNotes();
      eventBus.$on('updating', () => this.loadNotes());
      this.newNote = noteService.getEmptyNote();
    },
    destroyed() {
      eventBus.$off('updating');
    },

    methods: {
      selectColor(event) {
        this.newNote.style.backgroundColor = event.target.style.backgroundColor;
        this.isColorOpen = !this.isColorOpen;
      },
      loadNotes() {
        noteService.query().then((notes) => {
          this.notes = notes;
        });
      },
      selectNote(note) {
        this.selectedNote = note;
      },
      onImgInput(e) {
        const file = e.target.files[0];
        this.newNote.info.url = URL.createObjectURL(file);
        // this.save(this.newNote)
        // noteService.save(this.newNote)
      },
      removeNote(id) {
        noteService
          .remove(id)
          .then(() => {
            const msg = {
              txt: 'Deleted successfully',
              type: 'success',
            };
            eventBus.$emit('showMsg', msg);
            this.notes = this.notes.filter((note) => note.id !== id);
          })
          .catch((err) => {
            const msg = {
              txt: 'Error. Please try later',
              type: 'error',
            };
            eventBus.$emit('showMsg', msg);
          });
      },
      setFilter(filterBy) {
        this.filterBy = filterBy;
      },
      add() {
        noteService.save(this.newNote).then(() => {
          this.loadNotes();
          this.newNote = noteService.getEmptyNote();
        });
        this.editNewNote = false;

        const msg = {
          txt: 'Add successfully',
          type: 'success',
        };
        eventBus.$emit('showMsg', msg);
      },

      update(note) {
        noteService.save(note);
      },
      longNote() {
        this.editNewNote = true;
      },
      tubeMode() {
        this.newNote.type = 'noteTube';
        this.isTubeMode = true;
      },
      search() {
        noteService.getYoutubeVid(this.searchTubeMode).then(this.renderVideos);
      },
      renderVideos(videos) {
        var firstVid = videos[0].id.videoId;
        this.onSelectedVid(firstVid);
      },
      onSelectedVid(id) {
        this.newNote.info.tube = `https://www.youtube.com/embed/${id}`;
        this.add();
        this.searchTubeMode = '';
      },
    },
    computed: {
      notesToShow() {
        let pinnedNote = this.notes.filter((note) => note.isPinned);
        let NotPinnedNote = this.notes.filter((note) => !note.isPinned);
        return pinnedNote.concat(NotPinnedNote);
      },
    },
    components: {
      noteList,
    },
  };
</script>

<style></style>
