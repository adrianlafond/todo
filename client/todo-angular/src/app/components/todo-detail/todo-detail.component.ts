import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { TodosService, Todo } from '../../services/todos.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todo$: Observable<Todo>;
  error: HttpErrorResponse;

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService
  ) { }

  ngOnInit() {
    this.todo$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.todosService.getTodo(params.get('id'))),
      catchError((error: HttpErrorResponse) => {
        this.error = error;
        return of(null);
      })
    );
  }

}
