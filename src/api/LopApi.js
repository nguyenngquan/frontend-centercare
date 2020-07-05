import BaseApi from "./BaseApi";

export default class extends BaseApi {
  getAll = async () => {
    try {
      let urlBase = this.makeUrl("lops");
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (id = "") => {
    try {
      let urlBase = this.makeUrl("lops", id.toString());
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  delete = async (id = "") => {
    try {
      let urlBase = this.makeUrl("lops", id.toString());
      let result = await this.execute_delete(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  add = async (model) => {
    try {
      let urlBase = this.makeUrl("lops");
      let result = await this.execute_post(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  update = async (model) => {
    try {
      let urlBase = this.makeUrl("lops");
      let result = await this.execute_put(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getMyInfo = async () => {
    try {
      let urlBase = this.makeUrl("lops", "myaccount");
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}
