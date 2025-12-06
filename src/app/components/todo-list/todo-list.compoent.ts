import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../supabase.service';
import { AddTodoComponent } from '../add-todo/add-todo.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AddTodoComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{
  todos: any[] = [];

  constructor(private supa: SupabaseService) {
  }

  ngOnInit() {
    this.loadTodos();
    setInterval(() => this.loadTodos(), 30000); // for every 30 seconds polling
  }

  async loadTodos() {
    const { data } = await this.supa.getTodos();
    this.todos = (data || []).map((t: any) => ({
      ...t,
      editing: false,
      editText: t.title
    }));
  }

  async toggleDone(todo: any) {
    await this.supa.toggleTodo(todo.id, !todo.is_done);
    this.loadTodos();
  }

  enableEdit(todo: any) {
    todo.editing = true;
    todo.editText = todo.title;
  }

  async saveEdit(todo: any) {
    if (!todo.editText.trim()) return;
    await this.supa.updateTodo(todo.id, todo.editText.trim());
    todo.editing = false;
    this.loadTodos();
  }

  cancelEdit(todo: any) {
    todo.editing = false;
  }

  async deleteTodo(id: number) {
    await this.supa.deleteTodo(id);
    this.loadTodos();
  }

  onTodoAdded() {
    this.loadTodos(); // Refresh list after new todo is added
  }
}
