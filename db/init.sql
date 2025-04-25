-- Create the database
CREATE DATABASE IF NOT EXISTS monkey;

-- Use the database
USE monkey;

CREATE TABLE your_table_name (
  id INT AUTO_INCREMENT PRIMARY KEY,
  foundText TEXT NOT NULL,
  date DATE NOT NULL,
  startingPosition INT NOT NULL
);