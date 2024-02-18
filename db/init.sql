CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    picture VARCHAR(255),
);

INSERT INTO
    students (id, name, email, picture)
VALUES
    (1234, "kao", "kao@hotmail.com", "http://localhost:3000/pic")