import Route from '@ember/routing/route';

export default class EditContactRoute extends Route {
  model(params) {
    let contact, contact_id, number;
    contact_id = params.contact_id;
    if (contact_id == 'new') {
      number = this.store.createRecord('number');
      contact = this.store.createRecord('contact');
      number.contact = contact;
      number.type = 0;
    } else {
      contact = this.store.peekRecord('contact', contact_id);
    }
    if (!contact) {
      this.transitionTo('contacts');
    }
    return contact;
  }
}
