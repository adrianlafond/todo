import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';

import { TodosService, Todo } from '../services/todos.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todo$: Observable<Todo>;
  nonDirty: Todo;
  error: HttpErrorResponse;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todosService: TodosService
  ) { }

  ngOnInit() {
    this.todo$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.todosService.getTodo(params.get('id'))),
      tap(todo => {
        this.nonDirty = { ...todo };
        return todo;
      }),
      catchError((error: HttpErrorResponse) => {
        this.error = error;
        return of(null);
      })
    );
  }

  save(todo) {
    const hasDiff = Object.keys(todo).some(key => todo[key] !== this.nonDirty[key]);
    if (hasDiff) {
      this.nonDirty = { ...todo };
      this.todosService.updateTodo(todo).subscribe(
        (data: Todo) => this.nonDirty = data,
        (error: HttpErrorResponse) => this.error = error
      );
    }
  }

  delete(todo) {
    if (window.confirm('Really?')) {
      this.todosService.deleteTodo(todo.id).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => this.error = error
      );
    }
  }
}
