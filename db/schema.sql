-- Drop the database if it already exists
DROP DATABASE IF EXISTS fitness_app;

-- Create the database
CREATE DATABASE fitness_app;

-- Use the fitness_app database
USE fitness_app;

-- Create the workouts table
CREATE TABLE workouts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration INT,
  calories_burned INT
);

-- Create the workout_logs table
CREATE TABLE workout_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  workout_id INT,
  date DATE,
  duration INT,
  calories_burned INT,
  FOREIGN KEY (workout_id) REFERENCES workouts(id)
);