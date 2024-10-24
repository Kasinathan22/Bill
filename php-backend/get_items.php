<?php
// Ensure no extra output before headers
ob_start();

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set CORS headers to allow frontend requests
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
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
$password = ''; // Add your MySQL password if necessary

// Establish a database connection
$conn = new mysqli($host, $user, $password, $db);

// Check the database connection
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit();
}

// Query to fetch items from the database
$sql = "SELECT item_type, name, hsn_code AS hsn_sac, price, unit, 
        gst_rate, cess_rate, discount, discount_type FROM items";

$result = $conn->query($sql);

if ($result) {
    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    echo json_encode(["success" => true, "items" => $items]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch items: " . $conn->error
    ]);
}

// Close the database connection
$conn->close();

// Ensure no extra output is sent
ob_end_flush();
?>
