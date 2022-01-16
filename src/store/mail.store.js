// import { userService } from '../service/user-service.js';

import { itemService } from '../service/item.service';

export const mailStore = {
  state: {
    mails: null,
  },
  getters: {
    mails({ mails }) {
      return mails;
    },
  },
  mutations: {
    setMails(state, { mails }) {
      state.mails = mails;
    },
  },
  actions: {
    async loadMail({ state, commit }) {
      try {
        const mails = await itemService.query(state.filterBy);
        commit({ type: 'setMails', mails });
      } catch (err) {
        console.log(err);
      }
    },
    async removeMail({ commit }, { mailId }) {
      try {
        const mails = await itemService.remove(mailId);
        commit({ type: 'setMails', mails });
      } catch (err) {
        console.log(err);
      }
    },
    async saveMail({ commit }, { mail }) {
      try {
        const mailToSave = await itemService.save(mail);
        mail._id = mailToSave.insertedId;
        commit({ type: 'saveMail', mail });
        return mailToSave;
      } catch (err) {
        console.log(err);
      }
    },
    async updateMail({ commit }, { mail }) {
      try {
        const mailToUpdate = await itemService.save(mail);
        commit({ type: 'updateMail', mail });
        return mailToUpdate;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
