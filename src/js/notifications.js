import { success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default {
  changed() {
    success({
      text: "Company's DATA were successful changed!",
      icon: false,
      hide: true,
      delay: 2000,
      closer: false,
      sticker: false,
    });
  },

  created() {
    success({
      text: 'Company was created!',
      icon: false,
      hide: true,
      delay: 2000,
      closer: false,
      sticker: false,
    });
  },

  fill() {
    error({
      text: 'Nothing to change!',
      icon: false,
      hide: true,
      delay: 2000,
      closer: false,
      sticker: false,
    });
  },
};
