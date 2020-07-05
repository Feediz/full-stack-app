import config from "./config";
import Cryptr from "cryptr";

const cryptr = new Cryptr("846F7A254644FA21D9B1D844BA8E7");

export default class ApiData {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body != null) {
      options.body = JSON.stringify(body);
      console.log("ApiData:25");
      console.log(options.body);
    }
    // check if auth is required
    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );

      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getCourses() {
    const response = await this.api(`/courses`, "GET", null);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async getCourse(id) {
    if (id && !isNaN(id)) {
      const response = await this.api(`/courses/${id}`, "GET", null);
      if (response.status === 200) {
        return await response.json().then((data) => data);
      } else if (response.status === 401) {
        return null;
      } else {
        throw new Error();
      }
    }
  }

  async updateCourse(id, newData, userDetail) {
    const username = userDetail.emailAddress;
    const password = cryptr.decrypt(userDetail.p);
    console.log("USER DATA");
    console.dir(newData);
    const response = await this.api(`/courses/${id}`, "PUT", newData, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createCourse(newData, userData) {
    const username = userData.emailAddress;
    const password = cryptr.decrypt(userData.p);

    const response = await this.api(`/courses`, "POST", newData, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
