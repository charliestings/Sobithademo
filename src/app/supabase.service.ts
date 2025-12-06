import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://qcxqpcuaagoahwhoipwb.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjeHFwY3VhYWdvYWh3aG9pcHdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MjQwNzIsImV4cCI6MjA4MDMwMDA3Mn0.WqYa9pivLWouyjCr1m576MAeAhSdlEp2NI0NBacdttE'
    );
  }

  getTodos() {
    return this.supabase.from('todos').select('*').order('id');
  }

  addTodo(title: string) {
    return this.supabase.from('todos').insert([{ title }]);
  }

  updateTodo(id: number, title: string) {
    return this.supabase.from('todos').update({ title }).eq('id', id);
  }

  toggleTodo(id: number, is_done: boolean) {
    return this.supabase.from('todos').update({ is_done }).eq('id', id);
  }

  deleteTodo(id: number) {
    return this.supabase.from('todos').delete().eq('id', id);
  }
}
