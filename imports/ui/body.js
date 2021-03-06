

import { Tasks } from '../api/tasks.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks() {

    //console.log(Meteor.userId());
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count(); //return del numero de tareas que hay en la base de datos
  },
});

Template.body.events({  //insercion de datos en Mongo.
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    console.log(event);
    // Get value from form element
    const target = event.target;
    const text = target.text.value;

  // Insert a task into the collection
  Meteor.call('tasks.insert', text);

  // Clear form
  target.text.value = '';
},
'change .hide-completed input'(event, instance) {
  instance.state.set('hideCompleted', event.target.checked);
},
});
