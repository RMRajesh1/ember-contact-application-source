import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ContactNumberComponent extends Component {

  @service store;
  @service numberType;

  model = this.args.model;

  @action
  addNumber() {
    let number = this.store.createRecord('number');
    number.contact = this.model;
    number.type = 0;
  }

  @action
  removeNumber(element) {
    if (this.model.number.length > 1) {
      element.destroyRecord();
    }
  }

  @action
  setNumberType(number, value) {
    number.type = Number(value);
  }

  @action
  preventAlphaInput(event) {
    if (isNaN(Number(event.key))) {
      event.preventDefault();
    }
  }

}
