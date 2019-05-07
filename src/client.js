import rp from "request-promise";
import store from "store"

class Client {
  constructor() {
    const user = store.get("user");
    this.token = user ? user.token : null;
    this.defaultOptions = {
      headers: {
        "x-access-token": this.token
      },
      json: true
    };
  }
  get(stub, body = {}, options = {}) {
    return rp({
      uri: 'http://localhost:5000' + stub,
      method: "GET",
      body,
      ...this.defaultOptions,
      ...options
    });
  }
  post(stub, body = {}, options = {}) {
    return rp({
      uri: 'http://localhost:5000' + stub,
      method: "POST",
      body,
      ...this.defaultOptions,
      ...options
    });
  }
  put(stub, body = {}, options = {}) {
    return rp({
      uri: 'http://localhost:5000' + stub,
      method: "PUT",
      body,
      ...this.defaultOptions,
      ...options
    });
  }
  delete(stub, body = {}, options = {}) {
    return rp({
      uri: 'http://localhost:5000' + stub,
      method: "DELETE",
      body,
      ...this.defaultOptions,
      ...options
    });
  }
}

export default Client;
