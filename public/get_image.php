<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit(0);
}

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "customers_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  header("Content-Type: application/json");
  http_response_code(500);
  die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

try {
  $id = $_GET['id'] ?? null;
  $format = strtolower($_GET['format'] ?? 'png');
  
  if (!$id) {
      throw new Exception('Image ID is required');
  }
  
  // Validate format
  if (!in_array($format, ['png', 'jpg', 'jpeg'])) {
      throw new Exception('Unsupported format');
  }
  
  // Get image data
  $sql = "SELECT image_data FROM webpage_captures WHERE id = ?";
  $stmt = $conn->prepare($sql);
  
  if (!$stmt) {
      throw new Exception("Prepare failed: " . $conn->error);
  }
  
  $stmt->bind_param("i", $id);
  
  if (!$stmt->execute()) {
      throw new Exception("Execute failed: " . $stmt->error);
  }
  
  $result = $stmt->get_result();
  
  if ($result->num_rows === 0) {
      throw new Exception('Image not found');
  }
  
  $row = $result->fetch_assoc();
  $imageData = $row['image_data'];
  
  // Check if the image data is base64 encoded
  if (base64_encode(base64_decode($imageData, true)) === $imageData) {
      $imageData = base64_decode($imageData);
  }
  
  // Create image from string
  $image = @imagecreatefromstring($imageData);
  
  if (!$image) {
      throw new Exception('Failed to create image from data');
  }
  
  // Set content type header
  $contentType = $format === 'jpg' ? 'jpeg' : $format;
  header("Content-Type: image/$contentType");
  
  // Output image in requested format
  switch ($format) {
      case 'png':
          imagepng($image);
          break;
      case 'jpg':
      case 'jpeg':
          imagejpeg($image);
          break;
  }
  
  // Free memory
  imagedestroy($image);
  
} catch (Exception $e) {
  header("Content-Type: application/json");
  http_response_code(500);
  echo json_encode(["error" => $e->getMessage()]);
} finally {
  if (isset($stmt)) {
      $stmt->close();
  }
  if (isset($result)) {
      $result->free();
  }
  $conn->close();
}
?>