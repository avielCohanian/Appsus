<template>
  <section class="email-list app-main">
    <ul>
      <li v-for="email in emails" :key="email.id" class="email-preview-container">
        <email-preview :email="email" @remove="deleteEmail" />
      </li>
    </ul>
  </section>
</template>

<script>
  import emailPreview from './email-preview.cmp.vue';
  import { emailService } from '../services/email.service.js';

  export default {
    props: ['emails'],
    methods: {
      deleteEmail(emailId) {
        this.$emit('remove', emailId);
      },
    },
    components: {
      emailPreview,
      emailService,
    },
  };
</script>

<style></style>
