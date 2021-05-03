import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EditContactController extends Controller {
  @service router;
  @service store;

  @tracked urlValidationMessage = '';
  @tracked contactNameValidationMessage = '';
  @tracked contactNumberValidationMessage = '';
  @tracked contactEmailValidationMessage = '';
  @tracked NoProfileChoosedMessage = '';

  @tracked isChoosedAvatar = false;

  defaultContactImage = '/assets/images/call-profile.svg';
  profileAvatars = ['/assets/images/avatar.svg', '/assets/images/women-avatar.png', '/assets/images/call-profile.svg', '/assets/images/telephone-icon.jpeg', '/assets/images/woman-sporty-brunette.webp', '/assets/images/avatar-370-456322-512.webp'];

  @action
  saveContactData() {
    if (this.checkInputFields()) {
      this.model.date = new Date().getTime();
      this.model.number.forEach((element) => {element.save()});
      this.model.save();
      this.router.transitionTo('contacts');
    }
  }

  @action
  cancelThisOperation() {
    this.model.number.forEach(element => element.rollbackAttributes());
    this.model.rollbackAttributes();
    this.urlValidationMessage ='';
    this.contactNameValidationMessage = '';
    this.contactEmailValidationMessage = '';
    this.NoProfileChoosedMessage = '';
    this.router.transitionTo('contacts');
  }

  checkInputFields() {
    let defaultImage, isValidName, isValidEmail, isValidUrl, instance;
    instance = this.model;
    defaultImage = '/assets/images/call-profile.svg';
    isValidName = (instance.name == null || !instance.name) ? false : (/^[a-zA-Z0-9 .]+$/).test(instance.name);
    isValidEmail = (!instance.email) ? true : (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(instance.email);
    isValidUrl = ((instance.image && this.profileAvatars.includes(instance.image)) || !instance.image) ? true : (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/).test(instance.image);

    if (!isValidUrl) {
      this.urlValidationMessage = 'This url isn\'t valid!';
    } else {
      this.urlValidationMessage = '';
    }

    if (this.profileAvatars.includes(instance.image) && isValidUrl) {
      this.NoProfileChoosedMessage = '';
      this.urlValidationMessage = '';
    } else {
      this.NoProfileChoosedMessage = 'No profile choosen yet!';
    }

    this.contactNameValidationMessage = (!instance.name || instance.name == '' || instance.name == null) ? 'Contact name is required!' : (!isValidName) ? 'This contact name is invalid!' : '';
    this.contactEmailValidationMessage = (!isValidEmail) ? 'This email id is invalid!' : '';


    let validNumberCount = 0;
    let errorMessages = document.querySelectorAll('.number-input-sub-container');
    this.model.number.forEach((item, index) => {
      let isValidNumber = (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(item.number);
      if (isValidNumber) {
        validNumberCount++;
        errorMessages[index].querySelector('.validation-message').innerText = ''
      } else {
        errorMessages[index].querySelector('.validation-message').innerText = (!item.number) ? 'Contact number is required' : 'This number is invalid!';
      }
    });
    return (isValidName && isValidEmail && isValidUrl && (validNumberCount && validNumberCount == this.model.number.length));
  }


  @action
  chooseAvatar() {
    this.toggleProperty('isChoosedAvatar');
    if (this.model.image && this.profileAvatars.includes(this.model.image)) {
      this.urlValidationMessage = '';
    }
  }

  @action
  setContactImage(item) {
    this.model.image = item;
    this.NoProfileChoosedMessage = '';
  }

}
