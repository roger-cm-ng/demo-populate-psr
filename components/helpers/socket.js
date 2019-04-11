import openSocket from 'socket.io-client';

export default class Socket {
  static socket;

  static init() {
    this.socket = openSocket('#BASE_URL#');
  }

  static emit(evt, payload) {
    this.socket.emit(evt, payload);
  }
}
