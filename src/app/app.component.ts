import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from "./components/todo-list/todo-list.component"

@Component({
  selector: 'app-root',
  imports: [TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todoList';
}
