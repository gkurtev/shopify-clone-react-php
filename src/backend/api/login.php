<?php
include_once('../helpers/headers.php');
include_once('../database/db-connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$json = file_get_contents('php://input');
	$customer = json_decode($json);
	$email = urldecode($customer->email);
	$password = sha1($customer->password);

	$findUser = "select * from customers where email='$email' and password='$password'";

	$result = $connectDb->query($findUser);

	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
		$customerJson = [
			'email' => $row['email'],
			'first_name' => $row['first_name'],
			'last_name' => $row['last_name'],
			'customer_id' => $row['customer_id']
		];
		echo json_encode(['customer_data' => $customerJson, 'status_code' => 200]);
	} else {
		echo json_encode(['status_code' => 401]);
	}
}
