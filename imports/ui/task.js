import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { checked: ! this.checked }, //definimos si el nuevo valor "checked" es True o False.
    });
  },
  'click .delete'() {
    Tasks.remove(this._id);
  },
});
