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
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

$name = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$gstin = $_POST['gstin'] ?? '';

if (empty($name) || empty($phone) || empty($email) || empty($gstin)) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

$sql = "INSERT INTO customers (name, phone, email, gstin) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "SQL error: " . $conn->error]);
    exit;
}

$stmt->bind_param("ssss", $name, $phone, $email, $gstin);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Customer saved successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to save customer: " . $stmt->error]);
}

$stmt->close();
$conn->close();

?>
