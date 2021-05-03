import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ContactsContactRoute extends Route {

  @service store;

  model(params) {
    const { contact_id } = params;
    let contact = this.store.peekRecord('contact', contact_id);
    if (!contact) {
      this.transitionTo('contacts');
    }
    return contact;
  }

}
