<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log errors to a file
ini_set('log_errors', 1);
ini_set('error_log', '/path/to/error.log');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "customers_db";

try {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Get the data
    $imageData = $_POST['screenshot'] ?? '';
    $invoiceNo = $_POST['invoiceNo'] ?? '';
    $totalAmount = $_POST['totalAmount'] ?? 0;
    $name = $_POST['name'] ?? '';
    $paidStatus = $_POST['paidStatus'] ?? 'Unpaid';
    
    if (empty($imageData) || empty($invoiceNo)) {
        throw new Exception('Missing required data');
    }

    // Remove the data URL prefix if present
    $imageData = str_replace('data:image/png;base64,', '', $imageData);
    
    // Prepare SQL statement
    $sql = "INSERT INTO webpage_captures (invoice_no, image_data, capture_date, total_amount, customer_name, paid_status) VALUES (?, ?, NOW(), ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }
    
    $stmt->bind_param("ssdss", $invoiceNo, $imageData, $totalAmount, $name, $paidStatus);
    
    if (!$stmt->execute()) {
        throw new Exception("Execute failed: " . $stmt->error);
    }
    
    echo json_encode(["success" => true, "message" => "Invoice data saved successfully"]);
    
} catch (Exception $e) {
    // Log the error
    error_log("Error: " . $e->getMessage());
    
    // Send a more detailed error response
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
} finally {
    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($conn)) {
        $conn->close();
    }
}
?>