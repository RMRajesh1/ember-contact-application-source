import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NumberInputComponent extends Component {
  @service store;

  model = this.args.model;

  @action
  addOrRemoveNumber(element, method) {
    if (method == 'true') {
      this.store.createRecord('number', {
        contact: this.model,
        type: 0
      });
    } else {
      if (this.model.number.length > 1) {
        element.destroyRecord();
      }
    }
  }


  @action
  setNumberType(number, value) {
    number.type = Number(value);
  }

  @action
  preventAlphaInput(event) {
    let keyCode = event.keyCode;
    if (!(keyCode >= 48 && keyCode <= 57) && keyCode != 8) {
      event.preventDefault();
      console.log('prevented!');
    }
  }

}
