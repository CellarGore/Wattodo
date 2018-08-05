package com.salar.wattodo.wattodo.web;

import com.salar.wattodo.wattodo.model.Task;
import com.salar.wattodo.wattodo.model.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/home")
public class TaskController {
    private TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    Collection<Task> groups() {
        return taskRepository.findAll();
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public void addMember(@RequestBody Task task) {
        System.out.println("My new favorite thing" + task.getId());
        if (!taskRepository.existsByName(task.getName())) {
            taskRepository.save(new Task(task.getName(), false));
        } else {
            Task taskToChange = taskRepository.findByName(task.getName());
            taskToChange.setIsComplete(!taskToChange.getIsComplete());
            taskRepository.save(taskToChange);
        }
    }

}
