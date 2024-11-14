<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "customers_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

try {
    // Get the base64 image data
    $imageData = $_POST['screenshot'] ?? '';
    $invoiceNo = $_POST['invoiceNo'] ?? '';
    
    if (empty($imageData) || empty($invoiceNo)) {
        throw new Exception('Missing required data');
    }

    // Remove the data URL prefix if present
    $imageData = str_replace('data:image/png;base64,', '', $imageData);
    
    // Prepare SQL statement
    $sql = "INSERT INTO webpage_captures (invoice_no, image_data, capture_date) VALUES (?, ?, NOW())";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }
    
    $stmt->bind_param("ss", $invoiceNo, $imageData);
    
    if (!$stmt->execute()) {
        throw new Exception("Execute failed: " . $stmt->error);
    }
    
    echo json_encode(["success" => true, "message" => "Image saved successfully"]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
} finally {
    if (isset($stmt)) {
        $stmt->close();
    }
    $conn->close();
}
?>