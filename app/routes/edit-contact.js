import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class EditContactRoute extends Route {

  model(params) {
    let contact, number, contact_id;
    contact_id = params.contact_id;
    if (contact_id == 'new') {
      number = this.store.createRecord('number');
      contact = this.store.createRecord('contact');
      number.contact = contact;
      number.type = 0;
    } else {
      contact = this.store.findRecord('contact', contact_id);
      contact.catch(() => this.transitionTo('edit-contact', 'new') );
    }

    return contact;
  }

  // @action
  // willTransition(transition) {
  //   this.model.number.forEach(element => element.rollbackAttributes());
  //   this.model.rollbackAttributes();
  //   if (!confirm('You may lost the changes by redirecting!')) {
  //     transition.abort();
  //   }
  // }

}
