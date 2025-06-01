-- Create the database
CREATE DATABASE IF NOT EXISTS monkey;

-- Use the database
USE monkey;

CREATE TABLE results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text_fragment TEXT NOT NULL,
  counter INT NOT NULL
);