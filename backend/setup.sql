-- Create database
CREATE DATABASE image_upload_db;

-- Connect to the database
\c image_upload_db;

-- Create table for storing image metadata
CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  file_name VARCHAR(255) NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  upload_date TIMESTAMP NOT NULL
);

-- Grant permissions (adjust as needed)
GRANT ALL PRIVILEGES ON DATABASE image_upload_db TO your_username;
GRANT ALL PRIVILEGES ON TABLE images TO your_username;
