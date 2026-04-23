package com.todotodo.service;

import com.todotodo.entity.Todo;
import com.todotodo.entity.TodoStatus;

import java.util.List;
import java.util.Optional;

public interface TodoService {

    List<Todo> getAllTodos();

    Optional<Todo> getTodoById(Long id);

    Todo createTodo(Todo todo);

    Todo updateTodo(Long id, Todo todoDetails);

    void deleteTodo(Long id);

    Todo updateStatus(Long id, TodoStatus status);

    List<Todo> getTodosByStatus(TodoStatus status);

    List<Todo> searchTodos(String keyword);

    List<Todo> searchTodosByStatus(String keyword, TodoStatus status);

    List<Todo> getPendingTodos();

    List<Todo> getCompletedTodos();
}
