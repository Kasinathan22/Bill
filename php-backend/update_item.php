<?php
// Enable error reporting for logging to file
ini_set('log_errors', 1);
ini_set('error_log', 'error_log.txt'); // Update path if needed
error_reporting(E_ALL);

// Set CORS headers to allow requests from localhost:3000
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); // Allow credentials

// Handle OPTIONS preflight request and exit early
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    echo json_encode(["success" => true, "message" => "Preflight OK"]);
    exit();
}

// Database connection settings
$host = 'localhost';
$db = 'inventory';
$user = 'root';
$password = ''; // Update if your MySQL has a password

// Create connection
$conn = new mysqli($host, $user, $password, $db);

// Check if connection succeeded
if ($conn->connect_error) {
    error_log("Connection failed: " . $conn->connect_error);
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit();
}

// Log start of the script
error_log("update_item.php script started.");

// Parse JSON data from request body
$data = json_decode(file_get_contents("php://input"), true);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["success" => false, "message" => "Invalid JSON received."]);
    exit();
}

// Log received data for debugging
error_log("Received data: " . print_r($data, true));

// Validate request method and input data
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize inputs
    $id = isset($data['id']) ? intval($data['id']) : null;
    $name = isset($data['name']) ? $data['name'] : '';
    $item_type = isset($data['item_type']) ? $data['item_type'] : '';
    $hsn_sac = isset($data['hsn_sac']) ? $data['hsn_sac'] : '';
    $price = isset($data['price']) ? floatval($data['price']) : 0.0;
    $unit = isset($data['unit']) ? $data['unit'] : '';
    $gst_rate = isset($data['gst_rate']) ? floatval($data['gst_rate']) : 0.0;
    $cess_rate = isset($data['cess_rate']) ? floatval($data['cess_rate']) : 0.0;
    $discount = isset($data['discount']) ? floatval($data['discount']) : 0.0;

    // Check for required fields
    if (is_null($id) || empty($name) || empty($item_type)) {
        echo json_encode(["success" => false, "message" => "Missing required fields."]);
        exit();
    }

    // Prepare SQL statement
    $sql = "UPDATE items SET name = ?, item_type = ?, hsn_sac = ?, price = ?, unit = ?, gst_rate = ?, cess_rate = ?, discount = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("ssssssssi", $name, $item_type, $hsn_sac, $price, $unit, $gst_rate, $cess_rate, $discount, $id);
        
        // Execute statement and handle response
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Item updated successfully."]);
        } else {
            error_log("Error executing update: " . $stmt->error);
            echo json_encode(["success" => false, "message" => "Error executing update."]);
        }
        $stmt->close();
    } else {
        error_log("Error preparing SQL statement: " . $conn->error);
        echo json_encode(["success" => false, "message" => "Error preparing SQL statement."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}

// Close the database connection
$conn->close();
error_log("update_item.php script ended.");
?>
