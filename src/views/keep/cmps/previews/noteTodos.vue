<template>
  <div class="todos-cmp cmp-smart">
    <div class="note-cmp-smart">
      <i class="fas fa-thumbtack" @click="thumbtack"></i>
      <i class="fas fa-backspace back" @click="closeModal" title="back"></i>
    </div>

    <div class="todos-cmp-container">
      <img v-if="info.url" :src="info.url" :id="id" />

      <ul>
        <li v-for="(todo, idx) in info.todos" :key="idx">
          <span :class="{ done: todo.doneAt }" @click="onToggleTodo(todo.id)">{{ todo.txt }}</span>
          <i class="fas fa-times" @click="remove(idx)" title="remove"></i>
        </li>
      </ul>

      <div class="add-note">
        <input :class="color" type="text" v-model="currTxt.txt" @change="addTodo" />

        <i class="fas fa-plus" @click.stop="addTodo" title="Add"></i>
      </div>
    </div>

    <div class="txt-cmp-edit">
      <i class="fab fa-youtube" for="youtube"></i>
      <i class="fas fa-list" for="list"></i>
      <i class="fab fa-autoprefixer" for="palette"></i>

      <select class="fas fa-palette" :class="color" v-model="bcg.backgroundColor" @change="update">
        <option>white</option>
        <option>coral</option>
        <option>pink</option>
        <option>blue</option>
        <option>green</option>
        <option>yellow</option>
      </select>

      <label class="far fa-image" for="id">
        <!-- <input  id="id" type="file" :name=id  @change="onImgInput" hidden/> -->
      </label>
    </div>
  </div>
</template>

<script>
  import { noteService } from '../../service/keep-service';
  export default {
    props: ['info', 'bcg', 'id'],
    data() {
      return {
        sortBy: {
          category: 'IMPORTANCE',
          active: 'ALL',
        },
        currTxt: null,
      };
    },
    created() {
      this.currTxt = noteService.getEmptyTodo();
    },

    methods: {
      update() {
        this.$emit('update');
      },
      closeModal() {
        this.$emit('closeModal');
      },
      remove(idx) {
        this.$emit('removeTodo', idx);
      },
      onToggleTodo(todoId) {
        this.info.todos.forEach((todo) => {
          if (todo.id === todoId) {
            if (!todo.doneAt) todo.doneAt = Date.now();
            else todo.doneAt = null;
          }
        });
        this.update();
      },
      addTodo() {
        if (!this.currTxt.txt) return;
        this.info.todos.push(this.currTxt);
        this.update();
        this.currTxt = noteService.getEmptyTodo();
      },
      thumbtack() {
        this.$emit('addPinned');
      },
    },
    computed: {
      color() {
        return this.bcg.backgroundColor;
      },
    },
  };
</script>

<style></style>
