<template>
  <div>
    <p>{{ textForDisplay }} <span v-if="!expandText && isLongTxt">...</span></p>
    <button v-if="isLongTxt" @click="toggleText">{{ textButton }}</button>
  </div>
</template>

<script>
  export default {
    props: ['txt'],
    data() {
      return {
        expandText: false,
      };
    },
    methods: {
      toggleText() {
        this.expandText = !this.expandText;
      },
    },
    computed: {
      textForDisplay() {
        return this.expandText ? this.txt : this.txt.slice(0, 100);
      },
      textButton() {
        return this.expandText ? 'less' : 'more';
      },
      isLongTxt() {
        return this.txt.length > 100;
      },
    },
  };
</script>

<style></style>
