<?php
// Connect to database
include_once('../globals.php');

$connectDb = new mysqli(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

if ($connectDb->connect_errno) {
	echo 'Failed to connect to mysql' . $connectDb->connect_error;
	exit();
}

// create tables if not existent
$createCustomersTableQuery = "create table if not exists customers (
	customer_id int auto_increment primary key,
	email varchar(200) not null,
	created_at varchar(200) not null,
	first_name varchar(200) not null,
	last_name varchar(200) not null,
	password varchar(255) not null,
	unique(email)
	)";


$connectDb->query($createCustomersTableQuery);
