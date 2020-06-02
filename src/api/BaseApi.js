// base api
import { AuthContext } from "../context";
import { Notification } from "rsuite";

var urlJoin = require("url-join");

export default class BaseApi {
  static contextType = AuthContext;

  constructor(component) {
    this.baseUrl = process.env.REACT_APP_API_URL;
    this._component = component;
  }

  makeUrl = (...args) => {
    var path = urlJoin(args);
    return urlJoin(this.baseUrl, path);
  };

  call = async (url, method, model, noAuth) => {
    var access_token = undefined;
    try {
      var strToken = localStorage.getItem("token");
      var token = JSON.parse(strToken);

      if (token && token.access_token) {
        access_token = token.access_token;
      } else {
        access_token = null;
      }

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      };

      if (noAuth) {
        headers.Authorization = undefined;
      }

      let request = {
        method: method,
        headers: headers,
      };

      if (method === "POST" || method === "PUT" || "DELETE") {
        request.body = JSON.stringify(model);
      }

      let response = await fetch(url, request);

      let responseJson = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.reload();
      } else if (response.status === 403) {
        Notification.error({
          title: "Lỗi !!!",
          description: responseJson.message,
        });
      }

      return responseJson;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  execute_get = async (url) => {
    return await this.call(url, "GET");
  };

  execute_post = async (url, model) => {
    return await this.call(url, "POST", model);
  };

  postWithoutToken = async (url, model) => {
    return await this.call(url, "POST", model, true);
  };

  execute_put = async (url, model) => {
    return await this.call(url, "PUT", model);
  };

  execute_delete = async (url, model) => {
    return await this.call(url, "DELETE", model);
  };

  getToken = () => {
    var token = localStorage.getItem("token");
    if (token === undefined) window.location.href = "/login";
    return JSON.parse(token);
  };

  makeFormData(model) {
    const formData = new FormData();
    Object.entries(model).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  }

  uploadFile = async (url, files, obj) => {
    var data = new FormData();
    for (var i = 0; i < files.length; i++) {
      let c = files[i];
      data.append("file" + i + 1, c);
      if (obj !== undefined) {
        data.append("data", JSON.stringify(obj));
      }
    }
    var access_token = undefined;

    var strToken = localStorage.getItem("token");
    var token = JSON.parse(strToken);
    if (token && token.access_token) access_token = token.access_token;
    else access_token = null;
    var headers = {
      Accept: "application/json",
      Authorization: "Bearer " + access_token,
    };

    let response = await fetch(this.baseUrl + url, {
      method: "POST",
      body: data,
      headers: headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
    }

    let responseJson = await response.json();
    return responseJson;
  };
}
