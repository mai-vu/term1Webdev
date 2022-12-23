
CREATE TABLE A01325686_user (
  ID int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (ID),
  user_name VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50),
  password VARCHAR(50)
);

CREATE TABLE A01325686_user_timeline (
  ID int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (ID),
  user_id int NOT NULl,
  FOREIGN KEY (user_id) REFERENCES A01325686_user(ID) ON UPDATE CASCADE ON DELETE CASCADE,
  date_post DATE NOT NULL,
  text_post VARCHAR(50),
  time_post TIME NOT NULL,
  view INT NOT NULL
);

INSERT INTO A01325686_user(ID, user_name, first_name, last_name, email, password) VALUES (1, 'MaiVu', 'Mai', 'Vu', 'vhmai3007@gmail.com', 'password');

INSERT INTO A01325686_user_timeline(user_id, date_post, text_post, time_post, view) VALUES (1, '2022-09-01', 'Hello September', '09:09:09', 5);

INSERT INTO A01325686_user_timeline(user_id, date_post, text_post, time_post, view) VALUES (1, '2022-09-15', 'Ice Cream time!', '15:15:15', 6);
INSERT INTO A01325686_user_timeline(user_id, date_post, text_post, time_post, view) VALUES (1, '2022-09-30', 'Hoodie weather', '07:10:09', 5);
INSERT INTO A01325686_user_timeline(user_id, date_post, text_post, time_post, view) VALUES (1, '2022-10-01', 'Halloween month!', '21:09:09', 5);
INSERT INTO A01325686_user_timeline(user_id, date_post, text_post, time_post, view) VALUES (1, '2022-12-01', 'Almost there', '20:19:09', 5);