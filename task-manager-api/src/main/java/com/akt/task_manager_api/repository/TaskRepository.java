package com.akt.task_manager_api.repository;

import com.akt.task_manager_api.entity.Task;
import com.akt.task_manager_api.entity.TaskStatus;
import com.akt.task_manager_api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserOrderByCreatedAtDesc(User user);

    List<Task> findByUserAndStatusOrderByCreatedAtDesc(
            User user,
            TaskStatus status
    );

    List<Task> findByUserAndTitleContainingIgnoreCaseOrderByCreatedAtDesc(
            User user,
            String title
    );

    List<Task> findByUserAndStatusAndTitleContainingIgnoreCaseOrderByCreatedAtDesc(
            User user,
            TaskStatus status,
            String title
    );

    Optional<Task> findByIdAndUser(
            Long id,
            User user
    );
}