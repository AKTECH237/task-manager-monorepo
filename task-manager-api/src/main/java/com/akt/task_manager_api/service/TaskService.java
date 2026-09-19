package com.akt.task_manager_api.service;

import com.akt.task_manager_api.dto.TaskRequest;
import com.akt.task_manager_api.dto.TaskResponse;
import com.akt.task_manager_api.entity.Task;
import com.akt.task_manager_api.entity.TaskStatus;
import com.akt.task_manager_api.entity.User;
import com.akt.task_manager_api.exception.ResourceNotFoundException;
import com.akt.task_manager_api.repository.TaskRepository;
import com.akt.task_manager_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public List<TaskResponse> getTasks(
            Authentication authentication,
            TaskStatus status,
            String search
    ) {
        User user = getAuthenticatedUser(authentication);

        List<Task> tasks;

        boolean hasSearch = search != null && !search.isBlank();

        if (status != null && hasSearch) {

            tasks = taskRepository
                    .findByUserAndStatusAndTitleContainingIgnoreCaseOrderByCreatedAtDesc(
                            user,
                            status,
                            search.trim()
                    );

        } else if (status != null) {

            tasks = taskRepository
                    .findByUserAndStatusOrderByCreatedAtDesc(
                            user,
                            status
                    );

        } else if (hasSearch) {

            tasks = taskRepository
                    .findByUserAndTitleContainingIgnoreCaseOrderByCreatedAtDesc(
                            user,
                            search.trim()
                    );

        } else {

            tasks = taskRepository
                    .findByUserOrderByCreatedAtDesc(user);
        }

        return tasks.stream()
                .map(this::toResponse)
                .toList();
    }

    public TaskResponse createTask(
            TaskRequest request,
            Authentication authentication
    ) {
        User user = getAuthenticatedUser(authentication);

        Task task = Task.builder()
                .title(request.title())
                .description(request.description())
                .status(request.status())
                .user(user)
                .build();

        Task savedTask = taskRepository.save(task);

        return toResponse(savedTask);
    }

    public TaskResponse updateTask(
            Long taskId,
            TaskRequest request,
            Authentication authentication
    ) {
        User user = getAuthenticatedUser(authentication);

        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found")
                );

        task.setTitle(request.title());
        task.setDescription(request.description());
        task.setStatus(request.status());

        Task updatedTask = taskRepository.save(task);

        return toResponse(updatedTask);
    }

    public void deleteTask(
            Long taskId,
            Authentication authentication
    ) {
        User user = getAuthenticatedUser(authentication);

        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found")
                );

        taskRepository.delete(task);
    }

    private User getAuthenticatedUser(
            Authentication authentication
    ) {
        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Authenticated user not found")
                );
    }

    private TaskResponse toResponse(Task task) {

        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }
}
