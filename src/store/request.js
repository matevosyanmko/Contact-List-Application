class Request {
  constructor() {
    this.mainURL = 'https://gorest.co.in/public-api';
    this.accesToken = 'WpHnHsqVIYidLBU-Atsfp09JNgUinSCWh718';
  }
  get = (url) => this.sendRequest('GET', url, null, null);

  post = (url, data) => this.sendRequest('POST', url, JSON.stringify(data), 'application/json');

  put = (url, data, type = null) => this.sendRequest('PUT', url, JSON.stringify(data), 'application/json');

  delete = (url) => this.sendRequest('DELETE', url, null);

  sendRequest(method, url, data, contentType) {
    contentType = contentType ? contentType : 'application/x-www-form-urlencoded';
    return fetch(this.mainURL + url, {
      method: method,
      headers: {
        'Content-Type': contentType,
        Authorization: 'Bearer ' + this.accesToken
      },
      body: data
    });
  }
}

export default new Request();
