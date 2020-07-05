import BaseApi from "./BaseApi";

export default class extends BaseApi {
  getAll = async () => {
    try {
      let urlBase = this.makeUrl("diemdanhs");
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (id = "") => {
    try {
      let urlBase = this.makeUrl("diemdanhs", id.toString());
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  delete = async (id) => {
    try {
      let urlBase = this.makeUrl("diemdanhs", id);
      let result = await this.execute_delete(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  add = async (model) => {
    try {
      let urlBase = this.makeUrl("diemdanhs");
      let result = await this.execute_post(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  update = async (model) => {
    try {
      let urlBase = this.makeUrl("diemdanhs");
      let result = await this.execute_put(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getByIdHocVien = async (id) => {
    try {
      let urlBase = this.makeUrl("diemdanhs", "hocvien", id.toString());
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getListByMonthYear = async (month, year) => {
    try {
      let urlBase = this.makeUrl(
        "diemdanhs",
        "getBy?month=" + (month + 1) + "&year=" + year
      );
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getByDate = async (date) => {
    try {
      let urlBase = this.makeUrl(
        "diemdanhs",
        "getDiemDanhFromNgay?ngaydiemdanh=" + date
      );
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}
