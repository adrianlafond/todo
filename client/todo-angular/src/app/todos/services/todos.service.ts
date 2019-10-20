import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000/v1/';

export interface Todo {
  id: string | number;
  text: string;
  complete: boolean;
  notes: string;
}

@Injectable()
export class TodosService {

  constructor(private http: HttpClient) { }

  public getTodos() {
    return this.http.get<Todo[]>(`${API_URL}todos`);
  }

  public getTodo(id: string | number) {
    return this.http.get<Todo>(`${API_URL}todo/${id}`);
  }

  public updateTodo(todo: Todo) {
    return this.http.put<Todo>(`${API_URL}todo/${todo.id}`, todo);
  }

  public addTodo() {
    return this.http.post<Todo>(`${API_URL}todo`, {
      text: 'new todo'
    });
  }

  public deleteTodo(id: string | number) {
    return this.http.delete<Todo>(`${API_URL}todo/${id}`);
  }

  public resetTodos() {
    return this.http.put<Todo[]>(`${API_URL}reset`, null);
  }
}
