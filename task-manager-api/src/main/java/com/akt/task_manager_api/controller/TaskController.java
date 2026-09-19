package com.akt.task_manager_api.controller;

import com.akt.task_manager_api.dto.TaskRequest;
import com.akt.task_manager_api.dto.TaskResponse;
import com.akt.task_manager_api.entity.TaskStatus;
import com.akt.task_manager_api.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getTasks(
            Authentication authentication,

            @RequestParam(required = false)
            TaskStatus status,

            @RequestParam(required = false)
            String search
    ) {

        return ResponseEntity.ok(
                taskService.getTasks(
                        authentication,
                        status,
                        search
                )
        );
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @Valid @RequestBody TaskRequest request,
            Authentication authentication
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        taskService.createTask(
                                request,
                                authentication
                        )
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request,
            Authentication authentication
    ) {

        return ResponseEntity.ok(
                taskService.updateTask(
                        id,
                        request,
                        authentication
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id,
            Authentication authentication
    ) {

        taskService.deleteTask(
                id,
                authentication
        );

        return ResponseEntity.noContent().build();
    }
}
