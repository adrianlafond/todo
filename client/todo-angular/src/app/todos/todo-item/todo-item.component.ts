import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Todo, TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() data: Todo;
  @Input() isLast: boolean;

  private privateIsComplete = false;
  public get isComplete() {
    return this.privateIsComplete;
  }
  public set isComplete(value) {
    this.privateIsComplete = value;
    this.updateContainerClass();
  }

  public isEditing = false;

  public containerClass = {
    'todo-item--last': false,
    'todo-item--complete': false,
  };

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.isComplete = this.data.complete;
    this.updateContainerClass();
  }

  updateContainerClass() {
    this.containerClass = {
      'todo-item--last': this.isLast,
      'todo-item--complete': this.isComplete,
    };
  }

  onStartTextChange() {
    this.isEditing = true;
  }

  onInputKey($event) {
    if ($event.key === 'Enter') {
      $event.target.blur();
    }
  }

  save() {
    this.data.complete = this.isComplete;
    this.todosService.updateTodo(this.data).subscribe(
      (data: Todo) => this.data = data,
      (error: HttpErrorResponse) => console.error(error)
    );
    this.isEditing = false;
  }
}
