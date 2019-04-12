import _ from 'lodash';

export default class Estimate {
  static users = {};

  static vote(data) {
    if (!_.has(this.users, data.identity.deck)) {
      this.users[data.identity.deck] = {};
    }

    this.users[data.identity.deck][data.identity.initial] = {
      card: data.card,
      color: data.identity.color
    };

    return _.map(this.users[data.identity.deck], (val, key) => (
      {
        initial: key,
        card: val.card,
        color: val.color
      }
    ));
  }
}
