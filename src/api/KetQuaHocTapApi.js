import BaseApi from "./BaseApi";

export default class extends BaseApi {
  getAll = async () => {
    try {
      let urlBase = this.makeUrl("kqhts");
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (id) => {
    try {
      let urlBase = this.makeUrl("kqhts", id);
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  delete = async (id) => {
    try {
      let urlBase = this.makeUrl("kqhts", id);
      let result = await this.execute_delete(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  add = async (model) => {
    try {
      let urlBase = this.makeUrl("kqhts");
      let result = await this.execute_post(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  update = async (model) => {
    try {
      let urlBase = this.makeUrl("kqhts");
      let result = await this.execute_put(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getByIdHocVien = async (id) => {
    try {
      let urlBase = this.makeUrl("kqhts", "hocvien", id.toString());
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getKetQuaHocTap = async (idKiemTra, idLop) => {
    try {
      let urlBase = this.makeUrl(
        "kqhts",
        "baikiemtra?idKiemTra=" + idKiemTra + "&idLop=" + idLop
      );
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}
