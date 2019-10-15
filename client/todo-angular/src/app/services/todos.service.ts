import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000/v1/';

export interface Todo {
  id: string | number;
  text: string;
  complete: boolean;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  public getTodos() {
    return this.http.get<Todo[]>(`${API_URL}todos`);
  }

  public getTodo(id: string | number) {
    return this.http.get<Todo>(`${API_URL}todo/${id}`);
  }
}
