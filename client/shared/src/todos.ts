import * as superagent from 'superagent';

const API_URL = 'http://localhost:3000/v1/';

export interface TodoOptional {
  id?: string | number;
  text?: string;
  complete?: boolean;
  notes?: string;
}

export type Todo = Required<TodoOptional>;

export class Todos {
  /**
   * If @param id is defined, returns specific Todo. If not defined, returns
   * all Todos items.
   */
  static read(id?: string): Promise<Todo | Todo[]> {
    return new Promise((resolve, reject) => {
      const url = id ? `${API_URL}todo/${id}` : `${API_URL}todos`;
      superagent.get(url)
        .then(data => resolve(data.body))
        .catch(reject);
    });
  }

  static create(todo: TodoOptional = { text: 'new todo' }): Promise<Todo> {
    return new Promise((resolve, reject) => {
      superagent.post(`${API_URL}todo`)
        .send(todo)
        .then(data => resolve(data.body))
        .catch(reject);
    });
  }

  static update(id: string, todo: Todo): Promise<Todo> {
    return new Promise((resolve, reject) => {
      superagent.put(`${API_URL}todo/${id}`)
        .send(todo)
        .then(data => resolve(data.body))
        .catch(reject);
    });
  }

  static delete(id: string): Promise<undefined> {
    return new Promise((resolve, reject) => {
      superagent.delete(`${API_URL}todo/${id}`)
        .then(() => resolve())
        .catch(reject);
    });
  }

  static reset(): Promise<Todo[]> {
    return new Promise((resolve, reject) => {
      superagent.put(`${API_URL}reset`)
        .then(data => resolve(data.body))
        .catch(reject);
    });
  }
}
