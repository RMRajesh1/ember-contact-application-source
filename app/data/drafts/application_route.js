// import Route from '@ember/routing/route';
// import { inject as service } from '@ember/service';

// export default class ApplicationRoute extends Route {
//   @service store;

//   model() {
//     let contactKeys, numberKeys, contacts, storeContact, storeNumber, numbers, number;

//     contactKeys = localStorage.getItem('index-contacts');
//     numberKeys = localStorage.getItem('index-numbers');

//     if (contactKeys && contactKeys.length > 0) {
//       contactKeys = JSON.parse(contactKeys);
//       numberKeys = JSON.parse(numberKeys);

//       numbers = [];
//       for (let count = 0; count < numberKeys.length; count++) {
//         numbers.push(JSON.parse(localStorage.getItem(numberKeys[count])));
//       }

//       for (let count = 0; count < contactKeys.length; count++) {
//         contacts = JSON.parse(localStorage.getItem(contactKeys[count]));

//         storeContact = this.store.createRecord('contact', {
//           id: contacts.id,
//           image: contacts.attributes.image,
//           name: contacts.attributes.name,
//           email: contacts.attributes.email,
//           description: contacts.attributes.description,
//           date: contacts.attributes.date
//         });

//         number = numbers.filter((element) => {
//           return element.relationships.contact.data.id == contacts.id;
//         });

//         for (let countNumber = 0; countNumber < number.length; countNumber++) {
//           storeNumber = this.store.createRecord('number', {
//             contact: storeContact,
//             id: number[countNumber].id,
//             number: number[countNumber].attributes.number,
//             type: number[countNumber].attributes.type
//           });
//           storeNumber.save();
//         }
//         storeContact.save();
//       }
//     }
//   }
// }
