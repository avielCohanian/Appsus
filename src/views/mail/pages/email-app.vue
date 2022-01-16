<template>
  <section class="email-app app-main" v-if="emails">
    <email-filter @filtered="setFilter" :counter="counter" />
    <email-list :emails="MailToShow" @selected="selectMail" @remove="deleteEmail" />
  </section>
</template>

<script>
  import { eventBus } from '../../../service/event-bus-service';
  import emailList from '../cmps/email-list.cmp.vue';
  import emailFilter from '../cmps/email-filter.cmp.vue';
  import { emailService } from '../services/email.service.js';

  export default {
    data() {
      return {
        emails: null,
        selectedMail: null,
        filterBy: '',
        counter: 0,
      };
    },
    created() {
      this.loadMails();

      eventBus.$on('refresh', () => {
        this.loadMails();
      });
      eventBus.$on('filterMail', this.setFilterSearch);
      eventBus.$on('removeEmail', this.deleteEmail);
    },
    methods: {
      loadMails() {
        emailService.query().then((emails) => {
          this.emails = emails;
          this.countOpen();
        });
      },
      selectMail(mail) {
        this.selectedMail = mail;
      },
      deleteEmail(emailId) {
        emailService.remove(emailId).then(() => {
          this.emails = this.emails.filter((email) => email.id !== emailId);
          this.loadMails();
          const msg = {
            txt: 'Delete successfully',
            type: 'success',
          };
          eventBus.$emit('showMsg', msg);
        });
      },
      setFilter(filterBy) {
        this.filterBy = filterBy;
      },
      setFilterSearch(txt) {
        this.filterBy = txt;
      },
      countOpen() {
        let size = this.emails.length;
        let count = 0;
        let num = this.emails.forEach((email) => {
          if (email.isRead) count++;
        });
        var res = (count / size) * 100;
        this.counter = Math.floor(res * 10) / 10;
        eventBus.$emit('counter', this.counter);
      },
    },
    computed: {
      MailToShow() {
        if (!this.filterBy) return this.emails;
        if (this.filterBy === 'inbox') {
          return this.emails.filter((email) => !email.isTrash || !email.isDrafts);
        }
        if (this.filterBy === 'starred') {
          return this.emails.filter((email) => email.isStar);
        }
        if (this.filterBy === 'drafts') {
          return this.emails.filter((email) => email.isDrafts);
        }
        if (this.filterBy === 'trash') {
          return this.emails.filter((email) => email.isTrash);
        }
        if (this.filterBy === 'sent') {
          return this.emails.filter((email) => email.isSent);
        }
        return this.filterByTxt;
      },

      filterByTxt() {
        if (!this.filterBy) return (this.emails = this.emails);
        let filter = this.emails.filter((email) => {
          return (
            email.subject.toLowerCase().includes(this.filterBy) || email.body.toLowerCase().includes(this.filterBy)
          );
        });

        return filter;
      },
    },
    components: {
      emailList,
      emailService,
      emailFilter,
      eventBus,
    },
  };
</script>

<style></style>
