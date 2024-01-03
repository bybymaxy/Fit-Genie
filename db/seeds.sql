-- Insert sample workouts for certain body parts
INSERT INTO workouts (name, description, duration, calories_burned)
VALUES ('Chest Workout', 'A workout targeting the chest muscles', 45, 300),
       ('Leg Workout', 'A workout targeting the leg muscles', 60, 400),
       ('Back Workout', 'A workout targeting the back muscles', 50, 350),
       ('Arm Workout', 'A workout targeting the arm muscles', 30, 250),
       ('Shoulder Workout', 'A workout targeting the shoulder muscles', 40, 300),
       ('Core Workout', 'A workout targeting the core muscles', 35, 275);

-- Insert sample workout logs
INSERT INTO workout_logs (workout_id, date, duration, calories_burned)
VALUES (1, '2023-01-01', 45, 300),
       (2, '2023-01-02', 60, 400),
       (3, '2023-01-03', 50, 350),
       (4, '2023-01-04', 30, 250),
       (5, '2023-01-05', 40, 300),
       (6, '2023-01-06', 35, 275);