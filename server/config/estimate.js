export default class Estimate {
  static users = [];

  static vote(card, userData) {
    userData.card = card;

    if (this.users.length === 0) {
      this.users.push(userData);
      return;
    }

    for (let ind = 0; ind < this.users.length; ind += 1) {
      if (this.users[ind].email === userData.email) {
        this.users.splice(ind, ind + 1, userData);
        break;
      }

      if (ind === this.users.length - 1) {
        this.users.push(userData);
      }
    }
  }
}
