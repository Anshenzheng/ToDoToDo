export enum TodoStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export enum TodoPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export enum TodoCategory {
  WORK = 'WORK',
  STUDY = 'STUDY',
  LIFE = 'LIFE'
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  priority: TodoPriority;
  category: TodoCategory | null;
  dueDate: Date | null;
  reminderTime: Date | null;
  reminderEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoFormData {
  title: string;
  description: string;
  status: TodoStatus;
  priority: TodoPriority;
  category: TodoCategory | null;
  dueDate: string;
  reminderTime: string;
  reminderEnabled: boolean;
}
