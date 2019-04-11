export default class Estimate {
  static users = {};

  static vote(card, userData) {
    this.users[userData.email] = {
      card,
      firstName: userData.firstName,
      lastName: userData.lastName,
      color: userData.color
    };
    return this.users;
  }
}
