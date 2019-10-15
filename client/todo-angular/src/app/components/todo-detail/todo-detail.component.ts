import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TodosService, Todo } from '../../services/todos.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todo$: Observable<Todo>;

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService
  ) { }

  ngOnInit() {
    this.todo$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.todosService.getTodo(params.get('id')))
    );
  }

}
