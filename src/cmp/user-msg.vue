<template>
  <div v-if="msg" class="user-msg" :class="msg.type">
    <p>{{ msg.txt }}</p>
  </div>
</template>

<script>
  import { eventBus } from '../service/event-bus-service';

  export default {
    data() {
      return {
        msg: null,
      };
    },
    created() {
      eventBus.$on('showMsg', this.showMsg);
    },
    methods: {
      showMsg(msg) {
        this.msg = msg;
        setTimeout(() => {
          this.msg = null;
        }, 3000);
      },
    },
    destroyed() {
      eventBus.$off('showMsg', this.showMsg);
    },
    component: {
      eventBus,
    },
  };
</script>

<style></style>
