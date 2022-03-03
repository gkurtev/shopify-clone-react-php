<?php
include_once('../helpers/headers.php');
include_once('../helpers/helper-functions.php');
include_once('../database/db-connect.php');

// Create a collection
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action_type = $_POST['action_type'];
  $name = $_POST['name'];
  $image = NULL;
  $hasImage = false;

  if (!empty($_FILES['file'])) {
    $image = time() . $_FILES['file']['name'];
    $hasImage = true;
  }

  if ($action_type === 'create') {
    $collectionHandle = slug($name);
    $createCollection = "insert into collections (collection_handle, name, created_at, image) values ('$collectionHandle', '$name', NOW(), '$image')";
    $result = $connectDb->query($createCollection);

    if ($result) {
      $hasImage ? move_uploaded_file($_FILES['file']['tmp_name'], '../../../public/images/' . $image) : null;
      echo json_encode(['status_code' => 201]);
    } else {
      echo json_encode(['status_code' => 404]);
    }
  } else if ($action_type === 'update') {
    $handle = $_POST['handle'];
    $updateCollection = "update collections set name='$name' where collection_handle='$handle'";

    if ($hasImage) {
      $queryCollection = "select image from collections where collection_handle='$handle'";

      $result = $connectDb->query($queryCollection);

      if ($result) {
        $row = $result->fetch_assoc();
        $imagePath = '../../../public/images/' . $row['image'];

        if ($row['image']) {
          unlink($imagePath);
        }

        $updateCollection = "update collections set name='$name', image='$image' where collection_handle='$handle'";

        $result = $connectDb->query($updateCollection);

        if ($result) {
          move_uploaded_file($_FILES['file']['tmp_name'], '../../../public/images/' . $image);
          echo json_encode(['status_code' => 201]);
        } else {
          echo json_encode(['status_code' => 404]);
        }
      } else {
        echo json_encode(['status_code' => 404]);
      }
    } else {
      $result = $connectDb->query($updateCollection);

      if ($result) {
        echo json_encode(['status_code' => 201]);
      } else {
        echo json_encode(['status_code' => 404]);
      }
    }
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
      $collection['image'] = $row['image'];
      $collections[] = $collection;
    }
  }

  echo json_encode(['collections' => $collections]);
}


// Delete a collection
// curl -X "DELETE" "http://localhost/my-app/src/backend/api/collections.php" -d '{"handle":"new-arrivals","image":"1646307416mojae-Overview-mobile.png"}
if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
  $json = file_get_contents('php://input');
  $data = json_decode($json);
  $handle = $data->handle;
  $image = $data->image;
  $deleteCollection = "delete from collections where collection_handle='$handle'";
  $result = $connectDb->query($deleteCollection);

  if ($result) {
    $image ? unlink('../../../public/images/' . $image) : null;

    http_response_code(200);
    echo json_encode(['status_code' => 200]);
  } else {
    echo json_encode(['status_code' => 404]);
  }
}
