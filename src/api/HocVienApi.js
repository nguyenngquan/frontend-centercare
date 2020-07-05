import BaseApi from "./BaseApi";

export default class extends BaseApi {
  getAll = async () => {
    try {
      let urlBase = this.makeUrl("hocviens");
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (id = "") => {
    try {
      let urlBase = this.makeUrl("hocviens", id.toString());
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  delete = async (id = "") => {
    try {
      let urlBase = this.makeUrl("hocviens", id.toString());
      let result = await this.execute_delete(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  add = async (model) => {
    try {
      let urlBase = this.makeUrl("hocviens");
      let result = await this.execute_post(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  update = async (model) => {
    try {
      let urlBase = this.makeUrl("hocviens");
      let result = await this.execute_put(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getMyInfo = async () => {
    try {
      let urlBase = this.makeUrl("hocviens", "myaccount");
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getByTKHV = async (taikhoanHV = "") => {
    try {
      let urlBase = this.makeUrl("hocviens", "taikhoan", taikhoanHV);
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  themVaoLop = async (obj) => {
    try {
      let urlBase = this.makeUrl("hocviens", "themvaolop");
      let result = await this.execute_post(urlBase, obj);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  xoaKhoiLop = async (id = "") => {
    try {
      let urlBase = this.makeUrl("hocviens", "xoakhoilop", id.toString());
      let result = await this.execute_delete(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  changePassword = async (model) => {
    try {
      let urlBase = this.makeUrl("hocviens", "doimatkhau");
      let result = await this.execute_post(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}
