<?php
include_once('../helpers/headers.php');
include_once('../database/db-connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$json = file_get_contents('php://input');
	$customer = json_decode($json);
	$email = urldecode($customer->email);
	$encodedEmail = base64_encode($email);


	$findUser = "select created_at from customers where email='$email'";

	$result = $connectDb->query($findUser);

	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
		$createdAt = base64_encode($row['created_at']);
		$to = $email;
		$subject = "Password reset";
		$message = "
		<!DOCTYPE html>
<html lang=\"en\">
<head>
	<meta charset=\"UTF-8\">
	<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">
	<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
	<title>Reset password</title>
</head>
<body>
	<div class=\"page-test\">
	<h1>Follow the link to reset password, otherwise your eyes will suffer from the red color</h1>

	<a href=\"http://localhost:3000/confirm-password-reset?$encodedEmail&$createdAt\">Reset password</a>
	</div>
</body>
</html>

<style>
	.page-test {
		background-color: red;
		padding: 40px;
	}
</style>
		";

		// Send content-type in order to send HTML email
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

		// More headers
		$headers .= "From <todorka@example.com>" . "\r\n";
		$headers .= "Cc: nevermind@example.com" . "\r\n";

		mail($to, $subject, $message, $headers);
		echo json_encode(['status_code' => 200]);
	} else {
		echo json_encode(['status_code' => 401]);
	}
}
