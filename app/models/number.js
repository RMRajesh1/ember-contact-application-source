import Model, { attr, belongsTo } from '@ember-data/model';

export default class NumberModel extends Model {

  @belongsTo('contact') contact;

  @attr('string') number;
  @attr('number') type;

}
