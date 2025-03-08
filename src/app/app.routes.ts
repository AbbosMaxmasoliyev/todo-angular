import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export const routes: Routes = [
  { path: '', component: TodoListComponent }, // Bosh sahifa sifatida TodoList
  { path: 'todo', component: TodoListComponent } // `/todo` yo‘liga ham ulanish mumkin
];
