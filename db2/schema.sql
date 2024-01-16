
DROP DATABASE IF EXISTS user_responses_db
CREATE DATABASE user_responses_db 

CREATE TABLE user_responses(
    age INT,
    currentWeight INT,
    height INT,
    targetWeight INT,
    fitnessGoals TEXT,
    gym BOOLEAN,
    fitnessEquipment BOOLEAN,
    outdoorActivities TEXT, 
    daysAvailable INT, 
    exerciseIntensity TEXT, 
    currentFitness TEXT,
    focus TEXT,
    tracking TEXT,
    existingMedicalConditions TEXT,
);

