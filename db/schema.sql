
DROP DATABASE IF EXISTS fitness_app;


CREATE DATABASE fitness_app;


USE fitness_app;


CREATE TABLE workouts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration INT,
  calories_burned INT
);


CREATE TABLE workout_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  workout_id INT,
  date DATE,
  duration INT,
  calories_burned INT,
  FOREIGN KEY (workout_id) REFERENCES workouts(id)
);
