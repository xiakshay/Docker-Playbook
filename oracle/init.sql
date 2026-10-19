-- Create an application user
CREATE USER counter_app IDENTIFIED BY "CounterPass123";

ALTER SESSION SET CONTAINER = FREEPDB1;

ALTER USER counter_app QUOTA UNLIMITED ON USERS;

-- Create the requested table
CREATE TABLE counter_app.counter (
    count NUMBER(10) NOT NULL
);

-- Initialize the counter
INSERT INTO counter_app.counter (count) VALUES (0);

COMMIT;