import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { TodosComponent } from './components/todos/todos.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    TodosComponent,
    PreferencesComponent,
    TodoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
