<template>
  <div class="audio-cmp cmp-smart">
    <audio controls>
      <source :src="info.audio" />
    </audio>
  </div>
</template>

<script>
  export default {
    props: ['info', 'bcg', 'id'],
    data() {
      return {
        txt: '',
      };
    },
    methods: {
      update() {
        this.$emit('update', this.info, this.bcg);
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
