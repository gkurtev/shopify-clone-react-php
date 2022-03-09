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
  $createProduct = "insert into Products (collection_handle, handle, title, created_at) values ('$product_collection', '$product_handle' , '$product_title', NOW())";

  if ($product_collection === 'null') {
    $createProduct = "insert into Products ( handle, title, created_at) values ( '$product_handle' , '$product_title', NOW())";
  }

  $createdProduct = $connectDb->query($createProduct);
  $last_id = $connectDb->insert_id;

  // Create Options
  if (isset($_POST['options'])) {
    $options = json_decode($_POST['options'], true);
    $optionsString = '';

    foreach ($options as $key => $value) {
      $optionsString .= $options[$key]['optionName'] . ' / ';
    }

    $optionsSanitized = preg_replace('/ \/ $/', '', $optionsString);
    $addOptions = "insert into ProductOptions (name) values('$optionsSanitized')";
    $connectDb->query($addOptions);
    $findAddedOption = "select option_id from ProductOptions where name='$optionsSanitized'";
    $result = $connectDb->query($findAddedOption);

    // Create variants when options
    if ($result->num_rows > 0) {
      $option_id = $result->fetch_assoc()['option_id'];
      $variants = json_decode($_POST['variants'], true);
      $sql = '';

      foreach ($variants as $key => $value) {
        $title = $variants[$key]['title'];
        $price = $variants[$key]['price'] ? $variants[$key]['price'] : 0;
        $quantity = $variants[$key]['quantity'] ? $variants[$key]['quantity'] : 0;
        $sql .= "insert into ProductVariants (product_id, option_id, title, price, quantity) values ($last_id, $option_id, '$title', '$price', '$quantity');";
      }

      $connectDb->multi_query($sql);
    }
  } else {
    // Create variants without options
    $variants = json_decode($_POST['variants'], true);
    $title = $variants[0]['title'];
    $quantity = empty($variants[0]['quantity']) ? 0 :  $variants[0]['quantity'];
    $price = empty($variants[0]['price']) ? 0 : $variants[0]['price'];

    $addVariants = "insert into ProductVariants (product_id, title, price, quantity) values($last_id, '$title', '$price', '$quantity')";

    $connectDb->query($addVariants);
  }

  if ($createdProduct) {
    echo json_encode(['product_created' => true]);
  } else {
    echo json_encode(['product_created' => false]);
  }
}
