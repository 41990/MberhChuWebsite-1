
<?php
$servername = "localhost";
$username = "root";
$password = "";  // leave blank if you haven't set a MySQL password
$dbname = "mberhchu";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

// sql to create table reviews
$sql = "CREATE TABLE IF NOT EXISTS Reviews (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    names VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    addr VARCHAR(50) NOT NULL,
    mesg TEXT(5000) NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";
    
if ($conn->query($sql) === TRUE) {
    echo "Table Reviews created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();