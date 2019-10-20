import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { TodosService, Todo } from '../services/todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {
  public todos: Todo[];
  public error: Error;

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.todosService.getTodos().subscribe(
      (data: Todo[]) => this.todos = data,
      (error: HttpErrorResponse) => this.error = error
    );
  }

  add() {
    this.todosService.addTodo().subscribe(
      (data: Todo) => this.todos.push(data),
      (error: HttpErrorResponse) => this.error = error
    );
  }

  reset() {
    if (window.confirm('All you custom todos will be lost. Do it anyway?')) {
      this.todosService.resetTodos().subscribe(
        (data: Todo[]) => this.todos = data,
        (error: HttpErrorResponse) => this.error = error
      );
    }
  }
}
