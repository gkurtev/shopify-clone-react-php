<?php

$productsArr = [
	[
		"handle" => "product-1",
		"title" => "Product 1",
		"collectionHandle" => "new-arrivals",
		"id" => "74"
	],
	[
		"handle" => "product-1",
		"title" => "Product 1",
		"collectionHandle" => "new-arrivals",
		"id" => "74"
	],
	[
		"handle" => "product-1",
		"title" => "Product 1",
		"collectionHandle" => "new-arrivals",
		"id" => "74"
	],
	[
		"handle" => "product-45",
		"title" => "Product 45",
		"collectionHandle" => "new-arrivals",
		"id" => "76"
	],
	[
		"handle" => "product-45",
		"title" => "Product 45",
		"collectionHandle" => "new-arrivals",
		"id" => "76"
	],
	[
		"handle" => "product-45",
		"title" => "Product 45",
		"collectionHandle" => "new-arrivals",
		"id" => "76"
	]
];

$test = 76;
$index = -1;

foreach ($productsArr as $key => $value) {
	# code...

	if ($productsArr[$key]['id'] == $test) {
		$index = $key;
		break;
	}
}

if ($index <= -1)

	echo '<pre>';
var_dump($index);
echo '</pre>';
