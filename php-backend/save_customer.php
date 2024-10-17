<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit;
}

$host = 'localhost';
$db = 'customers_db';
$user = 'root';
$password = '';

$conn = new mysqli($host, $user, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$gstin = $_POST['gstin'];

$sql = "INSERT INTO customers (name, phone, email, gstin) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $phone, $email, $gstin);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Customer saved successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to save customer."]);
}

$sql = "SET @row_number = 0;
        SELECT (@row_number := @row_number + 1) AS id, name, phone, email, gstin
        FROM customers
        ORDER BY id;";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $customers = [];
    while($row = $result->fetch_assoc()) {
        $customers[] = $row;
    }
    echo json_encode($customers);
} else {
    echo json_encode(["message" => "No customers found."]);
}



$stmt->close();
$conn->close();
?>
