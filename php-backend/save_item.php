<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set CORS headers to allow requests from frontend
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit;
}

// Database connection details
$host = 'localhost';
$db = 'customers_db';
$user = 'root';
$password = ''; // Update if your MySQL has a password

// Create connection
$conn = new mysqli($host, $user, $password, $db);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}
// Parse JSON body from the request
$requestPayload = file_get_contents("php://input");
$data = json_decode($requestPayload, true);

$itemType = $data['itemType'] ?? '';
$itemName = $data['itemName'] ?? '';
$description = $data['description'] ?? '';
$price = $data['price'] ?? 0;
$unit = $data['unit'] ?? '';
$discount = $data['discount'] ?? 0;
$discountType = $data['discountType'] ?? '%';

// Validate required fields
if (empty($itemName) || empty($price) || empty($unit)) {
    echo json_encode(["success" => false, "message" => "Item name, price, and unit are required."]);
    exit();
}

// Prepare SQL statement
$sql = "INSERT INTO items (item_type, name, description, price, unit, discount, discount_type) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "SQL error: " . $conn->error]);
    exit();
}

// Bind parameters
$stmt->bind_param("sssdsds", $itemType, $itemName, $description, $price, $unit, $discount, $discountType);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Item saved successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to save item: " . $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>
