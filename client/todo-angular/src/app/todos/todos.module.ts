import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosComponent } from './todos/todos.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodosRoutingModule } from './todos-routing.module';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodosService } from './services/todos.service';

@NgModule({
  declarations: [
    TodosComponent,
    TodosListComponent,
    TodoDetailComponent,
    TodoItemComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule
  ],
  providers: [
    TodosService
  ]
})
export class TodosModule { }
