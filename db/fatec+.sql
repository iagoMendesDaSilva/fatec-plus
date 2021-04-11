DROP DATABASE IF EXISTS fatecplus;
CREATE DATABASE fatecplus;
USE fatecplus;

CREATE TABLE users(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(50) NOT NULL,
username VARCHAR(20) NOT NULL UNIQUE,
password VARCHAR(20) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
phone VARCHAR(15) NOT NULL,
address VARCHAR(200),
birthDate DATE,
studying VARCHAR (50),
job TINYINT(1) NOT NULL, 
internship TINYINT(1) NOT NULL, 
occupation_area VARCHAR(100),
description VARCHAR(300),
category VARCHAR(22) NOT NULL, /*student, teacher, internship coordinator, company, administrator*/
image TEXT,
token TEXT,
recovery INT(5) UNIQUE,
version_app VARCHAR(15),
PRIMARY KEY(id)
);

CREATE TABLE formations(
id INT NOT NULL AUTO_INCREMENT,
id_user INT NOT NULL,
title VARCHAR(100) NOT NULL,
subtitle VARCHAR(100),
startYear DATE NOT NULL,
endYear DATE,
workload TIME,
PRIMARY KEY(id),
FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE languages(
id INT NOT NULL AUTO_INCREMENT,
id_user INT NOT NULL,
language VARCHAR(100) NOT NULL,
level VARCHAR(15) NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE experiences(
id INT NOT NULL AUTO_INCREMENT,
id_user INT NOT NULL,
job VARCHAR(100) NOT NULL,
company VARCHAR(100) NOT NULL,
startYear DATE NOT NULL,
endYear DATE,
PRIMARY KEY(id),
FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE socialNetworks(
id INT NOT NULL AUTO_INCREMENT,
id_user INT NOT NULL,
name VARCHAR(20) NOT NULL,
url TEXT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE projects(
id INT NOT NULL AUTO_INCREMENT,
id_user INT NOT NULL,
name VARCHAR(20) NOT NULL,
url TEXT,
description VARCHAR(300),
PRIMARY KEY(id),
FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE jobs(
id INT NOT NULL AUTO_INCREMENT,
id_company INT NOT NULL,
id_job INT NOT NULL,
date DATE,
job TINYINT(1) NOT NULL,
internship TINYINT(1) NOT NULL, 
active TINYINT(1) NOT NULL,
name VARCHAR(30) NOT NULL,
category VARCHAR(20) NOT NULL,
receiveByEmail TINYINT(1) NOT NULL,
description VARCHAR(300),
PRIMARY KEY(id),
FOREIGN KEY (id_company) REFERENCES users(id)
);

CREATE TABLE requirements(
id INT NOT NULL AUTO_INCREMENT,
id_job INT NOT NULL,
name VARCHAR(30) NOT NULL UNIQUE,
level VARCHAR(10) NOT NULL,
mandatory  TINYINT(1) NOT NULL,
description VARCHAR(300),
PRIMARY KEY(id),
FOREIGN KEY (id_job) REFERENCES jobs(id)
);

CREATE TABLE benefits(
id INT NOT NULL AUTO_INCREMENT,
id_job INT NOT NULL,
name VARCHAR(30) NOT NULL UNIQUE,
description VARCHAR(300),
PRIMARY KEY(id),
FOREIGN KEY (id_job) REFERENCES jobs(id)
);

CREATE TABLE notifications(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL UNIQUE,
message VARCHAR(100) NOT NULL UNIQUE,
PRIMARY KEY(id)
);

CREATE TABLE news(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
message VARCHAR(200) NOT NULL,
versionApp VARCHAR(15) NOT NULL,
type VARCHAR(8) NOT NULL, /*novidade, removido, melhoria ,correção*/
PRIMARY KEY(id)
);

CREATE TABLE courses(
id INT NOT NULL AUTO_INCREMENT,
id_internship_coordinator INT NOT NULL,
name VARCHAR(50) NOT NULL UNIQUE,
duration INT NOT NULL,
FOREIGN KEY (id_internship_coordinator) REFERENCES users(id),
PRIMARY KEY(id)
);



