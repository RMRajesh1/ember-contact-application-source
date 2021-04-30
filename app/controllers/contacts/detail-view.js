import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ContactsDetailViewController extends Controller {
  @service router;
  @service store;

  @action
  deleteContact() {
    let isConfirm = confirm('Are you sure to delete this contact?');
    if (isConfirm) {
      this.model.number.forEach((element) => {
        element.destroyRecord();
      });
      this.model.destroyRecord();
      this.router.transitionTo('contacts');
    }

  }
}
