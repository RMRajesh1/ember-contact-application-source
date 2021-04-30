import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ContactListComponent extends Component {

  contacts = this.args.contacts;
  @tracked showContacts = this.contacts;
  @tracked isNoContactsAvailable = (this.showContacts.length <= 0) ? true : false;

  @action
  filterBySearch() {
    let value = (this.searchValue).toLowerCase();
    this.showContacts = this.contacts.filter((element) => {
      let isNumberMatched = element.number.filter((item) => {
        return (item.number.toLowerCase()).includes(value);
      });
      return ((element.name.toLowerCase()).includes(value) || ((element.email != null) && (element.email.toLowerCase()).includes(value)) || isNumberMatched.length > 0 || ((element.description != null) && (element.description.toLowerCase()).includes(value)));
    });
    this.isNoContactsAvailable = (this.showContacts.length <= 0) ? true : false;
  }

  @action
  filterByNUmberType(type) {
    type = Number(type);
    if (type == 4) {
      this.showContacts = this.contacts;
    } else {
      this.showContacts = this.contacts.filter((item) => {
        let filteredNumbers = item.number.filter(element => {
          return element.type == type;
        });
        return filteredNumbers.length;
      });
    }

    this.isNoContactsAvailable = (this.showContacts.length == 0) ? true : false;
  }

}
