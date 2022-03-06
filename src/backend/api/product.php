<?php
include_once('../helpers/headers.php');
include_once('../helpers/helper-functions.php');
include_once('../database/db-connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$action_type = $_POST['action_type'];
	$product_title = $_POST['title'];
	$product_collection = $_POST['collection'];
	$product_handle = slug($product_title);

	// Create product
	// $createProduct = "insert into Products (collection_handle, handle, title, created_at) values ('$product_collection', '$product_handle' , '$product_title', NOW())";

	// if ($product_collection === 'null') {
	// 	$createProduct = "insert into Products ( handle, title, created_at) values ( '$product_handle' , '$product_title', NOW())";
	// }

	// $result = $connectDb->query($createProduct);
	// $last_id = $connectDb->insert_id;
	// Create Options

	if ($_POST['options']) {
		$options = json_decode($_POST['options'], true);
		// echo '<pre>';
		// var_dump($options);
		// echo '</pre>';
		$optionsString = '';
		foreach ($options as $key => $value) {
			# code...
			// echo '<pre>';
			// var_dump($options[$key]);
			// echo '</pre>';
			$optionsString .= $options[$key]['optionName'] . ' / ';
		}

		echo '<pre>';
		var_dump(preg_replace('/ \/ $/', '', $optionsString));
		echo '</pre>';

		exit();
	} else {
		$variants = json_decode($_POST['variants'], true);
		$title = $variants[0]['title'];
		$quantity = empty($variants[0]['quantity']) ? 0 :  $variants[0]['quantity'];
		$price = empty($variants[0]['price']) ? 0 : $variants[0]['price'];

		$addVariants = "insert into ProductVariants (product_id, title, price, quantity) values($last_id, '$title', '$price', '$quantity')";

		$result = $connectDb->query($addVariants);
	}

	// Create Variants
	// echo json_encode(['x' => $product_title, 'h' => $product_handle, 'c' => $product_collection]);
	// exit();

	if ($result) {
		echo json_decode($connectDb->insert_id);
	} else {
		echo 'fail';
	}
}
