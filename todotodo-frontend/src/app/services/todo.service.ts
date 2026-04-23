import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, TodoStatus, TodoFormData } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  createTodo(todo: TodoFormData): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(id: number, todo: TodoFormData): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: number, status: TodoStatus): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${id}/status`, { status });
  }

  getTodosByStatus(status: TodoStatus): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/status/${status}`);
  }

  searchTodos(keyword: string): Observable<Todo[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Todo[]>(`${this.apiUrl}/search`, { params });
  }

  searchTodosByStatus(status: TodoStatus, keyword: string): Observable<Todo[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Todo[]>(`${this.apiUrl}/search/${status}`, { params });
  }

  getPendingTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/pending`);
  }

  getCompletedTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/completed`);
  }
}
