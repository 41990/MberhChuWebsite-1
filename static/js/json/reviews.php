<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mberhchu";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
} 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  header("Content-Type: application/json; charset=UTF-8");
    // Handle the POST request
    // Retrieve data from the form
  $names = $_POST['names'];
  $email = $_POST['email'];
  $addr = $_POST['address'];
  $msg = $_POST['reviewMessage'];

  // Process each input through the test_input function
  $names = test_input($names);
  $email = test_input($email);
  $addr = test_input($addr);
  $msg = test_input($msg);

  // Prepare and bind
  $stmt = $conn->prepare("INSERT INTO Reviews (names, email, addr, mesg) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("ssss", $names, $email, $addr, $msg);

    //Query to retrieve last reviews
    // Execute the statement
  if ($stmt->execute()) {
    // Get the ID of the last inserted record
    $last_id = $stmt->insert_id;

    // Fetch the record to get the reg_date
    $query = $conn->prepare("SELECT id, names, email, addr, mesg, reg_date FROM Reviews WHERE id = ?");
    $query->bind_param("i", $last_id);
    $query->execute();
    $result = $query->get_result();
    $row = $result->fetch_assoc();

    // Return a JSON response with id and reg_date
    echo json_encode([
        "status" => "success",
        "message" => "New review submitted successfully",
        "data" => [
            "id" => $row['id'],
            "names" => $row['names'],
            "email" => $row['email'],
            "addr" => $row['addr'],
            "mesg" => $row['mesg'],
            "reg_date" => $row['reg_date']
        ]
    ]);
  } else {
    echo json_encode([
        "status" => "error",
        "message" => "Error: " . $stmt->error
    ]);
  }

  // Close connections
  $stmt->close();
  $query->close();

}elseif($_SERVER['REQUEST_METHOD'] === 'GET'){
    // Query to retrieve all reviews
  $sql = "SELECT id, names, email, addr, mesg, reg_date FROM Reviews ORDER BY id ASC";
  $result = $conn->query($sql);

  // Check if there are results
  if ($result->num_rows > 0) {
      $reviews = [];

      // Fetch all reviews
      while($row = $result->fetch_assoc()) {
          $reviews[] = $row;
      }

      // Return reviews as JSON
      echo json_encode([
          "status" => "success",
          "data" => $reviews
      ]);
  }else {
      // No reviews found
      echo json_encode([
          "status" => "success",
          "message" => "No reviews found",
          "data" => []
      ]);
  }
}  else {
    // Respond with a 405 error if the method is not allowed
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed, but got here...']);
}

// Close connection
$conn->close();

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
