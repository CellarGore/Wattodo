# Wattodo
A repo to hold code for the single-page Todo Webapp. Made using Spring Boot with frontend created with React.js.


## How to Run

First build and fire off the Spring backend using Maven in the root directory.
```
mvnw.cmd spring-boot:run
```

Then start the frontend using npm in the Wattodo/src/main/java/com/salar/wattodo/wattodo/app/ directory
```
npm start
```

This should lead to the following display at localhost:3000

![alt text](https://github.com/SalarUW/Wattodo/blob/master/project.png)

One of the requirements that this project doesn't currently support is persistence. The todo tasks are not persisted to any datastore.
