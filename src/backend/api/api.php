<?php
include_once('../helpers/headers.php');
include_once('../database/db-connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	$getUser = "select * from customers";
	$customersJson = [];

	if (isset($_GET['email'])) {
		$email = urldecode($_GET['email']);
		$getUser = "select * from customers where email='$email'";
	}
	# code...
	$result = $connectDb->query($getUser);

	if ($result->num_rows > 0) {
		while ($row = $result->fetch_assoc()) {
			$customer['customer_id'] = $row['customer_id'];
			$customer['email'] = $row['email'];
			$customer['created_at'] = $row['created_at'];
			$customer['first_name'] = $row['first_name'];
			$customer['last_name'] = $row['last_name'];
			$customersJson[] = $customer;
		}

		echo json_encode($customersJson);
	} else {
		echo json_encode(['response' => 'fail']);
	}
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
	// get post contents and decode customer data
	$json = file_get_contents('php://input');
	$customer = json_decode($json);

	// fill post values
	$email = urldecode($customer->email);
	$first_name = $customer->first_name;
	$last_name = $customer->last_name;
	$password = $customer->password;

	// send register user query
	$registerCustomer = "insert into customers (email, created_at, first_name, last_name, password) values('$email', NOW(),'$first_name','$last_name', SHA('$password'))";

	// stash in results variable
	$result = $connectDb->query($registerCustomer);

	// check if result returns more than 0 rows
	if ($result) {
		echo json_encode(['status_code' => 201]);
	} else {
		echo json_encode(['status_code' => 409]);
	}
} else {
	echo json_encode(["response" => "Epic fail"]);
}
