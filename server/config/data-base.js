import mongodb from 'mongodb';

export default class DataBase {
  static dataBaseClient;

  static isConnected = false;

  static init() {
    const { MongoClient } = mongodb;
    const uri = 'mongodb+srv://roger:5crum-card@scrum-vt9vg.gcp.mongodb.net/test?retryWrites=true';
    this.dataBaseClient = new MongoClient(uri, { useNewUrlParser: true });
    this.dataBaseClient.connect((err) => {
      if (err) {
        throw new Error('Error occurred while connecting to MongoDB Atlas...\n', err);
      } else {
        // eslint-disable-next-line no-console
        console.log('dB connected');
        this.isConnected = true;
      }
    });
  }

  static getUsers(cred, success, fail) {
    if (!this.isConnected) {
      throw new Error('Error occurred while connecting to MongoDB Atlas...');
    }

    this.dataBaseClient.connect((err, client) => {
      const collection = client.db('db').collection('users');
      collection.find(cred).toArray((collectionErr, doc) => {
        if (collectionErr) {
          fail(403, { message: 'dB error' });
        } else if (doc.length === 0) {
          fail(500, { message: 'Wrong pin number' });
        } else {
          success(doc);
        }
      });
    });
  }
}
