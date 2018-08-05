package com.salar.wattodo.wattodo.model;


import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Task findByName(String name);

    boolean existsByName(String name);
}
