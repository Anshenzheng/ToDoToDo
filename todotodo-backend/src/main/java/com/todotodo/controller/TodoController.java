package com.todotodo.controller;

import com.todotodo.entity.Todo;
import com.todotodo.entity.TodoStatus;
import com.todotodo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {

    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        return todoService.getTodoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoService.createTodo(todo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todoDetails) {
        try {
            Todo updatedTodo = todoService.updateTodo(id, todoDetails);
            return ResponseEntity.ok(updatedTodo);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Todo> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> statusMap) {
        try {
            TodoStatus status = TodoStatus.valueOf(statusMap.get("status"));
            Todo updatedTodo = todoService.updateStatus(id, status);
            return ResponseEntity.ok(updatedTodo);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/status/{status}")
    public List<Todo> getTodosByStatus(@PathVariable String status) {
        return todoService.getTodosByStatus(TodoStatus.valueOf(status.toUpperCase()));
    }

    @GetMapping("/search")
    public List<Todo> searchTodos(@RequestParam String keyword) {
        return todoService.searchTodos(keyword);
    }

    @GetMapping("/search/{status}")
    public List<Todo> searchTodosByStatus(@PathVariable String status, @RequestParam String keyword) {
        return todoService.searchTodosByStatus(keyword, TodoStatus.valueOf(status.toUpperCase()));
    }

    @GetMapping("/pending")
    public List<Todo> getPendingTodos() {
        return todoService.getPendingTodos();
    }

    @GetMapping("/completed")
    public List<Todo> getCompletedTodos() {
        return todoService.getCompletedTodos();
    }
}
