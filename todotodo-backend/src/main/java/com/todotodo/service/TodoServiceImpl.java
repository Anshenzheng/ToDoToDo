package com.todotodo.service;

import com.todotodo.entity.Todo;
import com.todotodo.entity.TodoStatus;
import com.todotodo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    @Autowired
    public TodoServiceImpl(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @Override
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    @Override
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    @Override
    public Todo updateTodo(Long id, Todo todoDetails) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setTitle(todoDetails.getTitle());
                    todo.setDescription(todoDetails.getDescription());
                    todo.setStatus(todoDetails.getStatus());
                    todo.setPriority(todoDetails.getPriority());
                    todo.setCategory(todoDetails.getCategory());
                    todo.setDueDate(todoDetails.getDueDate());
                    todo.setReminderTime(todoDetails.getReminderTime());
                    todo.setReminderEnabled(todoDetails.getReminderEnabled());
                    return todoRepository.save(todo);
                })
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
    }

    @Override
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }

    @Override
    public Todo updateStatus(Long id, TodoStatus status) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setStatus(status);
                    return todoRepository.save(todo);
                })
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
    }

    @Override
    public List<Todo> getTodosByStatus(TodoStatus status) {
        return todoRepository.findByStatusOrderByPriorityDescDueDateAsc(status);
    }

    @Override
    public List<Todo> searchTodos(String keyword) {
        return todoRepository.searchByKeyword(keyword);
    }

    @Override
    public List<Todo> searchTodosByStatus(String keyword, TodoStatus status) {
        return todoRepository.searchByKeywordAndStatus(keyword, status);
    }

    @Override
    public List<Todo> getPendingTodos() {
        return todoRepository.findByStatusNotOrderByDueDateAsc(TodoStatus.COMPLETED);
    }

    @Override
    public List<Todo> getCompletedTodos() {
        return todoRepository.findByStatusOrderByUpdatedAtDesc(TodoStatus.COMPLETED);
    }
}
