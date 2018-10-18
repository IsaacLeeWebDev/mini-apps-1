DROP DATABASE IF EXISTS checkouts;
CREATE DATABASE checkouts;
USE checkouts;

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL
);

CREATE TABLE addresses (
	id INT AUTO_INCREMENT PRIMARY KEY,
	line_1 VARCHAR(100) NOT NULL,
	line_2 VARCHAR(100),
	city VARCHAR(100) NOT NULL,
	state VARCHAR(2),
	zip_code VARCHAR(100) NOT NULL,
	phone_number VARCHAR(100) NOT NULL,
	user_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE payment_methods (
	id INT AUTO_INCREMENT PRIMARY KEY,
	credit_card_number VARCHAR(30) NOT NULL,
	expiration_date VARCHAR(12) NOT NULL,
	cvv VARCHAR(100) NOT NULL,
	billing_zip_code VARCHAR(100) NOT NULL,
	user_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO users (name, email, password) VALUES ('joey bluff', 'joey@bluff.com', 'password'), ('karen kid', 'karen@gmail.com', 'qwertyuiop'), ('monkey bizness', 'troll@monkeiestrollingyou.com', '*&D*F&sdk&,3/23D');
INSERT INTO addresses (line_1, line_2, city, state, zip_code, phone_number, user_id) VALUES ('1 fun street', 'null', 'boring', 'or', '97392', '5035555555', (SELECT id from users WHERE name = 'joey bluff'));
INSERT INTO payment_methods (credit_card_number, expiration_date, cvv, billing_zip_code, user_id) VALUES ('1234567890123456', '01/14/24', '677', '97393', (SELECT id FROM users WHERE name="joey bluff"));