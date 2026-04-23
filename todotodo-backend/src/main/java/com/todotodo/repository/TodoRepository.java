package com.todotodo.repository;

import com.todotodo.entity.Todo;
import com.todotodo.entity.TodoStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByStatus(TodoStatus status);

    List<Todo> findByStatusOrderByDueDateAsc(TodoStatus status);

    List<Todo> findByStatusOrderByDueDateDesc(TodoStatus status);

    List<Todo> findByStatusOrderByCreatedAtDesc(TodoStatus status);

    @Query("SELECT t FROM Todo t WHERE t.status != :status ORDER BY t.dueDate ASC")
    List<Todo> findByStatusNotOrderByDueDateAsc(@Param("status") TodoStatus status);

    @Query("SELECT t FROM Todo t WHERE t.title LIKE %:keyword% OR t.description LIKE %:keyword%")
    List<Todo> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT t FROM Todo t WHERE (t.title LIKE %:keyword% OR t.description LIKE %:keyword%) AND t.status = :status")
    List<Todo> searchByKeywordAndStatus(@Param("keyword") String keyword, @Param("status") TodoStatus status);

    List<Todo> findByReminderEnabledTrueAndReminderTimeBetween(LocalDateTime start, LocalDateTime end);

    List<Todo> findByStatusOrderByPriorityAscDueDateAsc(TodoStatus status);

    List<Todo> findByStatusOrderByPriorityDescDueDateAsc(TodoStatus status);
}
