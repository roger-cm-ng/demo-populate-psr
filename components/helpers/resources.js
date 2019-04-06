/* global window */

export default class Resources {
  static baseUrl = '#BASE_URL#';

  static ajax({
    endPoint, body, success, fail, token, method
  }) {
    let statusCode;
    window.fetch(`${this.baseUrl}/${endPoint}`, {
      method,
      body: JSON.stringify(body),
      headers: {
       'Content-Type': 'application/json',
       Authorization: token ? `Bearer ${token}` : ''
      }
    })
    .then((res) => {
      const { status } = res;
      statusCode = status;
      return res.json();
    })
    .then((payload) => {
      if (statusCode === 200) {
        success(payload);
      } else {
        payload.status = statusCode;
        fail(payload);
      }
    })
    .catch((err) => { throw new Error(err); });
  }

  static authenticate({ body, success, fail }) {
    this.ajax({
      endPoint: 'api/authenticate',
      method: 'POST',
      body,
      success,
      fail
    });
  }

  static verifyUser({ token, success, fail }) {
    this.ajax({
      endPoint: 'api/verify-user',
      method: 'POST',
      token,
      success,
      fail
    });
  }

  static vote({
    token, body, success, fail
  }) {
    this.ajax({
      endPoint: 'api/vote',
      method: 'POST',
      token,
      body,
      success,
      fail
    });
  }

  static estimations({ token, success, fail }) {
    this.ajax({
      endPoint: 'api/estimations',
      method: 'GET',
      token,
      success,
      fail
    });
  }

  static acquireUsers({ success, fail }) {
    this.ajax({
      endPoint: 'api/users',
      method: 'GET',
      success,
      fail
    });
  }
}
