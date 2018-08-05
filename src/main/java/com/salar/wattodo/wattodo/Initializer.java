package com.salar.wattodo.wattodo;

import com.salar.wattodo.wattodo.model.Task;
import com.salar.wattodo.wattodo.model.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
public class Initializer implements CommandLineRunner {

    private final TaskRepository taskRepository;

    public Initializer(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public void run(String...strings) {
        Stream.of("make breakfast", "do laundry", "help kids", "dig garden")
                .forEach(name -> taskRepository.save(new Task(name, true)));

    }

}
