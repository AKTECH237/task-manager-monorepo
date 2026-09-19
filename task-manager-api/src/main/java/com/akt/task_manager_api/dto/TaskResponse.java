package com.akt.task_manager_api.dto;

import com.akt.task_manager_api.entity.TaskStatus;

import java.time.LocalDateTime;

public record TaskResponse(
        Long id,
        String title,
        String description,
        TaskStatus status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}