import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ContactListComponent extends Component {

  @service numberType;

  contacts = this.args.contacts;
  @tracked contactList = this.contacts;
  @tracked isAscSort = true;

  @action
  filterBySearch() {
    let value = (this.searchValue).toLowerCase();
    this.contactList = this.contacts.filter((element) => {
      let isNumberMatched = element.number.filter((item) => {
        return (item.number.toLowerCase()).includes(value);
      });
      return ((element.name.toLowerCase()).includes(value) || ((element.email != null) && (element.email.toLowerCase()).includes(value)) || isNumberMatched.length > 0 || ((element.description != null) && (element.description.toLowerCase()).includes(value)));
    });
  }

  @action
  filterByNumberType(type) {
    type = Number(type);
    if (type == 4) {
      this.contactList = this.contacts;
    } else {
      this.contactList = this.contacts.filter((item) => {
        let filteredNumbers = item.number.filter(element => {
          return element.type == type;
        });
        return filteredNumbers.length;
      });
    }
  }

  @action
  sortContact(source) {
    this.isAscSort = !this.isAscSort;
    let contactsArray = [];
    source.forEach(element => contactsArray.push(element) );
    if (this.isAscSort) {
      contactsArray.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
    } else {
      contactsArray.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 1);
    }
    this.contactList = contactsArray;
  }

}
