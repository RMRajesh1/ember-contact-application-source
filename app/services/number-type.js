import Service from '@ember/service';

export default class NumberTypeService extends Service {
  numberTypes = [
    {type: 'personal', code: 0},
    {type: 'company', code: 1},
    {type: 'landline', code: 2},
    {type: 'others', code: 3}
  ];
}
