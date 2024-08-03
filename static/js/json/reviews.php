<?php


header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle the POST request
    $data = $_POST;

    // Process each input through the test_input function
  foreach ($data as $key => $value) {
    $data[$key] = test_input($value);
  }

    // Process the data if needed, then return it as a JSON response
    echo json_encode($data);
} else {
    // Respond with a 405 error if the method is not allowed
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed, but got here...']);
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
