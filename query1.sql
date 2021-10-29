-- Write the query to create the 4 tables below.
CREATE TABLE client (
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    UNIQUE KEY full_name (first_name, last_name)
);

CREATE TABLE employee (
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    start_date date NOT NULL,
    email varchar(255) NOT NULL,
    UNIQUE KEY full_name (first_name, last_name)
);

CREATE TABLE project (
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    comments text,
    cid int,
    FOREIGN KEY (cid)
    REFERENCES client (id),
    UNIQUE KEY title (title)
);

CREATE TABLE works_on (
	pid int NOT NULL,
    eid int NOT NULL,
    due_date date NOT NULL,
    PRIMARY KEY (pid, eid),
	FOREIGN KEY (pid)
    REFERENCES project (id),
	FOREIGN KEY (eid)
    REFERENCES employee (id)
);


-- Leave the queries below untouched. These are to test your submission correctly.
-- Test that the tables were created
DESCRIBE client;
DESCRIBE employee;
DESCRIBE project;
DESCRIBE works_on;

-- Test that the correct foreign keys were created 
SELECT TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME,REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME 
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE REFERENCED_TABLE_SCHEMA = 'grade';

