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
    exit();
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

// Fetch items from the database
$sql = "SELECT item_type, name, description, price, unit, discount, discount_type FROM items";
$result = $conn->query($sql);

if ($result) {
    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    echo json_encode(["success" => true, "items" => $items]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to fetch items: " . $conn->error]);
}

// Close connection
$conn->close();
?>
