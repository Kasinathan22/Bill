<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set CORS headers to allow requests from frontend
header("Access-Control-Allow-Origin: http://localhost:3000"); // Replace with your frontend URL if different
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Adjust methods as needed
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit;
}

// Database connection details
$host = 'localhost';
$db = 'inventory';
$user = 'root';
$password = ''; // Update if your MySQL has a password

// Create connection
$conn = new mysqli($host, $user, $password, $db);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Parse JSON body from the request
$requestPayload = file_get_contents("php://input");
$data = json_decode($requestPayload, true);

// Check for JSON parsing errors
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["success" => false, "message" => "Invalid JSON data."]);
    exit();
}

// Extract and sanitize input data
$itemType = isset($data['itemType']) ? htmlspecialchars(trim($data['itemType'])) : '';
$itemName = isset($data['itemName']) ? htmlspecialchars(trim($data['itemName'])) : '';
$description = isset($data['description']) ? htmlspecialchars(trim($data['description'])) : '';
$price = isset($data['price']) ? floatval($data['price']) : 0.0;
$unit = isset($data['unit']) ? htmlspecialchars(trim($data['unit'])) : '';
$discount = isset($data['discount']) ? floatval($data['discount']) : 0.0;
$discountType = isset($data['discountType']) ? htmlspecialchars(trim($data['discountType'])) : '%';
$hsnCode = isset($data['hsnCode']) ? htmlspecialchars(trim($data['hsnCode'])) : '';
$gstRate = isset($data['gstRate']) ? floatval($data['gstRate']) : 0.0;
$cessRate = isset($data['cessRate']) ? floatval($data['cessRate']) : 0.0;

// Validate required fields
if (empty($itemName) || empty($price) || empty($unit) || empty($hsnCode)) {
    echo json_encode(["success" => false, "message" => "Item name, price, unit, and HSN Code are required."]);
    exit();
}

// Prepare SQL statement
$sql = "INSERT INTO items (item_type, name, description, price, unit, discount, discount_type, hsn_code, gst_rate, cess_rate) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "SQL error: " . $conn->error]);
    exit();
}

// Bind parameters (Data Types: s - string, d - double)
$stmt->bind_param("sssdssdidd", $itemType, $itemName, $description, $price, $unit, $discount, $discountType, $hsnCode, $gstRate, $cessRate);

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
