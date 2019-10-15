import { Component, OnInit } from '@angular/core';
import { TodosService, Todo } from '../../services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  public todos: Todo[];

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.todosService.getTodos().subscribe((data: Todo[]) => {
      this.todos = data;
    });
  }
}
