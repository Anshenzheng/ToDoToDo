import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo, TodoStatus, TodoPriority, TodoCategory, TodoFormData } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  @Input() todo: Todo | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  todoForm: FormGroup;
  isEditMode: boolean = false;
  statusOptions = Object.values(TodoStatus);
  priorityOptions = Object.values(TodoPriority);
  categoryOptions = Object.values(TodoCategory);

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService
  ) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.maxLength(1000)]],
      status: [TodoStatus.PENDING],
      priority: [TodoPriority.MEDIUM],
      category: [''],
      dueDate: [''],
      reminderTime: [''],
      reminderEnabled: [false]
    });
  }

  ngOnInit(): void {
    if (this.todo) {
      this.isEditMode = true;
      this.patchFormValues();
    }

    this.todoForm.get('reminderEnabled')?.valueChanges.subscribe((value: boolean) => {
      if (!value) {
        this.todoForm.get('reminderTime')?.setValue('');
      }
    });
  }

  patchFormValues(): void {
    if (!this.todo) return;

    this.todoForm.patchValue({
      title: this.todo.title,
      description: this.todo.description || '',
      status: this.todo.status,
      priority: this.todo.priority,
      category: this.todo.category || '',
      dueDate: this.formatDateForInput(this.todo.dueDate),
      reminderTime: this.formatDateForInput(this.todo.reminderTime),
      reminderEnabled: this.todo.reminderEnabled
    });
  }

  formatDateForInput(date: Date | string | null): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  getStatusLabel(status: TodoStatus): string {
    const labels: { [key: string]: string } = {
      'PENDING': '待办',
      'IN_PROGRESS': '进行中',
      'COMPLETED': '已完成'
    };
    return labels[status] || status;
  }

  getPriorityLabel(priority: TodoPriority): string {
    const labels: { [key: string]: string } = {
      'HIGH': '高',
      'MEDIUM': '中',
      'LOW': '低'
    };
    return labels[priority] || priority;
  }

  getCategoryLabel(category: TodoCategory): string {
    const labels: { [key: string]: string } = {
      'WORK': '工作',
      'STUDY': '学习',
      'LIFE': '生活'
    };
    return labels[category] || category;
  }

  onSubmit(): void {
    if (this.todoForm.invalid) {
      return;
    }

    const formValue = this.todoForm.value;
    const todoData: TodoFormData = {
      title: formValue.title,
      description: formValue.description,
      status: formValue.status,
      priority: formValue.priority,
      category: formValue.category || undefined,
      dueDate: formValue.dueDate,
      reminderTime: formValue.reminderEnabled ? formValue.reminderTime : '',
      reminderEnabled: formValue.reminderEnabled
    };

    if (this.isEditMode && this.todo) {
      this.todoService.updateTodo(this.todo.id, todoData).subscribe(
        () => this.saved.emit(),
        (error) => console.error('Error updating todo:', error)
      );
    } else {
      this.todoService.createTodo(todoData).subscribe(
        () => this.saved.emit(),
        (error) => console.error('Error creating todo:', error)
      );
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
