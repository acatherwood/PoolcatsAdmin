import http from "../http-common";

class SwimmerDataService {
  getAll() {
    return http.get("/swimmers");
  }

  get(id) {
    return http.get(`/swimmers/${id}`);
  }

  create(data) {
    return http.post("/swimmers", data);
  }

  update(id, data) {
    return http.put(`/swimmers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/swimmers/${id}`);
  }

  deleteAll() {
    return http.delete(`/swimmers`);
  }

//   findByTitle(title) {
//     return http.get(`/swimmers?title=${title}`);
//   }
}

export default new SwimmerDataService();