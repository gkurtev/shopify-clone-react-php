<?php
include_once('../helpers/headers.php');
include_once('../database/db-connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	$email = urldecode($_GET['email']);
	$created_at = urldecode($_GET['created_at']);

	$findUser = "select * from customers where email='$email' and created_at='$created_at'";

	$result = $connectDb->query($findUser);

	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
		echo json_encode(['status_code' => 200]);
	} else {
		echo json_encode(['status_code' => 401]);
	}
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$json = file_get_contents('php://input');
	$customer = json_decode($json);
	$email = urldecode($customer->email);
	$created_at = urldecode(($customer->created_at));
	$password = $customer->password;

	$updateUser = "update customers set password=SHA('$password') where email='$email' and created_at='$created_at'";

	$result = $connectDb->query($updateUser);

	if ($result) {
		echo json_encode(['status_code' => 204]);
	} else {
		echo json_encode(['status_code' => 404]);
	}
}
