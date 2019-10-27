import superagent from 'superagent';

const API_URL = 'http://localhost:3000/v1/';

class Todos {
  static getTodos() {
    return new Promise((resolve, reject) => {
      superagent.get(`${API_URL}todos`).then(data => {
        resolve(data.body);
      }).catch(error => {
        reject(error);
      });
    });
  }

  static getTodo(id) {
    //
  }

  static setTodo(id, value) {
    //
  }
}

export default Todos;
