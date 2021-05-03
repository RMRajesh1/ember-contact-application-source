import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ContactsContactController extends Controller {

  @service router;
  @service store;

  @action
  deleteContact() {
    if (confirm('Are you sure to delete this contact?')) {
      this.model.number.forEach(element => element.destroyRecord());
      this.model.destroyRecord();
      this.router.transitionTo('contacts');
    }

  }
}
