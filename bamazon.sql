-- delete database if exists
DROP DATABASE IF EXISTS bamazon_db;

-- create the database
CREATE DATABASE bamazon_db;

-- start the database
USE bamazon_db;

-- create table
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    item VARCHAR (45) NULL,
    department VARCHAR (45) NULL,
    price DECIMAL (10,2) NULL,
    quantity INT NULL,
    PRIMARY KEY (id)
);

-- insert data into the table
INSERT INTO products (item, department, price, quantity)
Values ("paper", "office supplies", 10.50, 200),("light bulbs", "home", 3.00, 100),("yarn - scarlet", "craft supplies", 4.50, 50),("chocolate bar", "food", 100, 100),("bread", "food", 1.95, 500),("comb", "health & beauty", 0.10, 1000),("towels - blue", "home", 15.99, 25),("curtains - beige", "home", 150, 35),("binder", "office supplies", 12.00, 75),("steak", "food", 16.55, 175);

-- show table data
SELECT * FROM bamazon_db.products;