import { Component, OnInit } from '@angular/core';
import { Todo, TodoStatus } from './models/todo.model';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ToDoToDo - 待办事项管理平台';
  pendingTodos: Todo[] = [];
  completedTodos: Todo[] = [];
  allTodos: Todo[] = [];
  searchKeyword: string = '';
  activeTab: string = 'pending';
  showAddModal: boolean = false;
  editingTodo: Todo | null = null;
  reminderCheckInterval: any;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
    this.startReminderCheck();
  }

  loadTodos(): void {
    this.todoService.getPendingTodos().subscribe(
      (todos: Todo[]) => this.pendingTodos = todos,
      (error) => console.error('Error loading pending todos:', error)
    );

    this.todoService.getCompletedTodos().subscribe(
      (todos: Todo[]) => this.completedTodos = todos,
      (error) => console.error('Error loading completed todos:', error)
    );

    this.todoService.getAllTodos().subscribe(
      (todos: Todo[]) => this.allTodos = todos,
      (error) => console.error('Error loading all todos:', error)
    );
  }

  onSearch(): void {
    if (this.searchKeyword.trim()) {
      this.todoService.searchTodos(this.searchKeyword).subscribe(
        (todos: Todo[]) => {
          this.pendingTodos = todos.filter(t => t.status !== TodoStatus.COMPLETED);
          this.completedTodos = todos.filter(t => t.status === TodoStatus.COMPLETED);
        },
        (error) => console.error('Error searching todos:', error)
      );
    } else {
      this.loadTodos();
    }
  }

  clearSearch(): void {
    this.searchKeyword = '';
    this.loadTodos();
  }

  openAddModal(): void {
    this.editingTodo = null;
    this.showAddModal = true;
  }

  openEditModal(todo: Todo): void {
    this.editingTodo = { ...todo };
    this.showAddModal = true;
  }

  closeModal(): void {
    this.showAddModal = false;
    this.editingTodo = null;
  }

  onTodoSaved(): void {
    this.closeModal();
    this.loadTodos();
  }

  toggleComplete(todo: Todo): void {
    const newStatus = todo.status === TodoStatus.COMPLETED ? TodoStatus.PENDING : TodoStatus.COMPLETED;
    this.todoService.updateStatus(todo.id, newStatus).subscribe(
      () => this.loadTodos(),
      (error) => console.error('Error updating todo status:', error)
    );
  }

  deleteTodo(todo: Todo): void {
    if (confirm('确定要删除这个待办事项吗？')) {
      this.todoService.deleteTodo(todo.id).subscribe(
        () => this.loadTodos(),
        (error) => console.error('Error deleting todo:', error)
      );
    }
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  startReminderCheck(): void {
    this.reminderCheckInterval = setInterval(() => {
      this.checkReminders();
    }, 60000);
  }

  checkReminders(): void {
    const now = new Date();
    this.pendingTodos.forEach(todo => {
      if (todo.reminderEnabled && todo.reminderTime) {
        const reminderTime = new Date(todo.reminderTime);
        const timeDiff = reminderTime.getTime() - now.getTime();
        if (timeDiff > 0 && timeDiff <= 60000) {
          this.showReminder(todo);
        }
      }
    });
  }

  showReminder(todo: Todo): void {
    const notification = new Notification('待办事项提醒', {
      body: todo.title,
      icon: 'favicon.ico'
    });
    
    notification.onclick = () => {
      window.focus();
    };
  }

  requestNotificationPermission(): void {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  getCategoryLabel(category: string): string {
    const labels: { [key: string]: string } = {
      'WORK': '工作',
      'STUDY': '学习',
      'LIFE': '生活'
    };
    return labels[category] || category;
  }

  getPriorityLabel(priority: string): string {
    const labels: { [key: string]: string } = {
      'HIGH': '高',
      'MEDIUM': '中',
      'LOW': '低'
    };
    return labels[priority] || priority;
  }

  formatDate(date: Date | string | null): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  isOverdue(todo: Todo): boolean {
    if (!todo.dueDate || todo.status === TodoStatus.COMPLETED) return false;
    return new Date(todo.dueDate) < new Date();
  }
}
