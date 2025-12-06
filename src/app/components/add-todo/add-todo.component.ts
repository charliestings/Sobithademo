import { Component, EventEmitter, Output } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  title: string = '';
  @Output() added = new EventEmitter<void>();

  constructor(private supabaseService: SupabaseService) {}

  async addTodo() {
    if (!this.title.trim()) return;
    await this.supabaseService.addTodo(this.title.trim());
    this.title = '';
    this.added.emit(); // Notify parent component
  }
}
