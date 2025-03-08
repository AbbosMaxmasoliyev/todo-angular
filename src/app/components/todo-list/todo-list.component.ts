import { Component, computed, signal } from '@angular/core';
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
  todos = signal<Todo[]>([]);
  filter = signal<'all' | boolean>('all');

  // Filterlangan todos ro'yxati
  filteredTodos = computed(() => {
    return this.filter() === 'all'
      ? this.todos()
      : this.todos().filter(todo => todo.completed === this.filter());
  });

  // Yangi vazifa qo'shish
  addTodo(text: string) {
    if (text.trim() === '') return;
    this.todos.update(todos => [
      ...todos,
      { id: Date.now(), text, completed: false }
    ]);
  }

  // Vazifa holatini almashtirish
  toggleTodo(id: number) {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Vazifani o'chirish
  deleteTodo(id: number) {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  // Filterni o'zgartirish
  filterTodos(type: 'all' | boolean) {
    this.filter.set(type);
  }

  // Hozirgi filterni qaytarish
  filterActive() {
    return this.filter();
  }
}
