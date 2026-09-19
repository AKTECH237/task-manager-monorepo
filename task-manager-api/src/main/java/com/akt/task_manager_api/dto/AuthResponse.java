package com.akt.task_manager_api.dto;

public record AuthResponse(
        String token,
        Long userId,
        String name,
        String email
) {
}
