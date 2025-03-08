import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';


interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, InputTextModule, FormsModule, ButtonModule, Message],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  // State management using Signals
  filterActive = signal<string | boolean>("all")
  todos = signal<Todo[]>([
    { id: 1, text: 'Jizzax uchun loyihani tugatish', completed: false },
    { id: 2, text: 'Consulting firmani saytini tugatish', completed: true }
  ]);

  // Filterlangan todo list (Signal)
  filteredTodos = signal<Todo[]>(this.todos());

  // Filtering function
  filterTodos(filterData: string | boolean) {
    this.filterActive.set(filterData)
    if (typeof filterData === 'boolean') {
      this.filteredTodos.set(this.todos().filter(todo => todo.completed === filterData));
    } else if (filterData === 'all') {
      this.filteredTodos.set(this.todos());
    }
  }

  addTodo(todoText: string) {
    console.log("Salom")
    if (!todoText.trim()) return;

    this.todos.update(todos => [
      ...todos,
      { id: Date.now(), text: todoText, completed: false }
    ]);
  }

  toggleTodo(id: number) {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  deleteTodo(id: number) {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }
}
