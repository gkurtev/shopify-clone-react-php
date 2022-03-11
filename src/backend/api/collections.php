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

if ($_SERVER['REQUEST_METHOD'] === "GET") {
  // get all products from a single collection
  if (isset($_GET['collection'])) {
    $collection_handle = $_GET['collection'];

    $queryCollection = "select p.product_id, p.handle, p.title, p.collection_handle, pv.title as variant_title, pv.price, pv.quantity, pv.id, po.name
    from Products as p
    inner join collections as c on p.collection_handle = c.collection_handle
    inner join ProductVariants as pv on p.product_id = pv.product_id
    inner join ProductOptions as po on pv.option_id = po.option_id
    where c.collection_handle = '$collection_handle'";

    $collectionResult = $connectDb->query($queryCollection);
    $productsArr = [];

    if ($collectionResult->num_rows > 0) {
      while ($row = $collectionResult->fetch_assoc()) {
        $index = null;
        $product = (object) [];
        $product->handle = $row['handle'];
        $product->title = $row['title'];
        $product->collectionHandle = $row['collection_handle'];
        $product->id = (int) $row['product_id'];

        // product variants
        $variantsObj = (object) [];
        $variantsObj->title = $row['variant_title'];
        $variantsObj->quantity = (int) $row['quantity'];
        $variantsObj->price = (float) $row['price'];
        $variantsObj->id = (int) $row['id'];
        $product->variants[] = $variantsObj;

        // product options
        $optionsObj = (object) [];
        $optionsObj->name = $row['name'];
        $optionsObj->values[] = $row['variant_title'];
        $product->options[] = $optionsObj;

        if (count($productsArr) > 0) {
          foreach ($productsArr as $key => $value) {
            if ($productsArr[$key]->id === $product->id) {
              $index = $key;
              break;
            }
          }
        }

        if (is_null($index)) {
          $productsArr[] = $product;
        } else {
          $productsArr[$index]->variants[] = $variantsObj;
          $productsArr[$index]->options[0]->values[] = $row['variant_title'];
        }
      }

      echo json_encode(['products' => $productsArr]);
    } else {
      echo 'fail to get collection';
    }
  } else {
    // Get all collections
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
