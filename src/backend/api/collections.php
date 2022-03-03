<?php
include_once('../helpers/headers.php');
include_once('../helpers/helper-functions.php');
include_once('../database/db-connect.php');

// Create a collection
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $json = file_get_contents('php://input');
  $collection = json_decode($json);
  $action_type = $collection->action_type;
  $name = $collection->name;

  if ($action_type === 'create') {
    $collectionHandle = slug($name);
    $createCollection = "insert into collections (collection_handle, name, created_at) values ('$collectionHandle', '$name', NOW())";
    $result = $connectDb->query($createCollection);

    if ($result) {
      echo json_encode(['status_code' => 201]);
    } else {
      echo json_encode(['status_code' => 404]);
    }

    exit();
  }
}

// Get all collections
if ($_SERVER['REQUEST_METHOD'] === "GET") {
  $getAllCollections = "select * from collections order by created_at desc";
  $result = $connectDb->query($getAllCollections);
  $collections = [];

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $collection['handle'] = $row['collection_handle'];
      $collection['title'] = $row['name'];
      $collections[] = $collection;
    }
  }

  echo json_encode(['collections' => $collections]);
}


// Delete a collection
if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
  parse_str(file_get_contents('php://input'), $_DELETE);
  $handle = key($_DELETE);
  $deleteCollection = "delete from collections where collection_handle='$handle'";
  $result = $connectDb->query($deleteCollection);

  if ($result) {
    http_response_code(200);
    echo json_encode(['status_code' => 200]);
  } else {
    echo json_encode(['status_code' => 404]);
  }
}
