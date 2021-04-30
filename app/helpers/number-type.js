import { helper } from '@ember/component/helper';

export default helper(function numberType(params/*, hash*/) {

  let [ index ] = params;

  switch (index) {
    case 0:
      return 'personal'
    case 1:
      return 'company'
    case 2:
      return 'landline'
    case 3:
      return 'others'
  }

});
