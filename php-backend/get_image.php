<?php
// Allow CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Log request details
error_log("Received request for invoice: " . $_GET['invoice_no']);

if (!isset($_GET['invoice_no'])) {
    header("HTTP/1.0 400 Bad Request");
    echo "Missing invoice number";
    exit;
}

$invoice_no = $_GET['invoice_no'];
$file_path = __DIR__ . "/invoice_images/{$invoice_no}.png";

// Check if the file exists
if (!file_exists($file_path)) {
    header("HTTP/1.0 404 Not Found");
    echo "Image not found for invoice number: " . $invoice_no;
    error_log("File not found: " . $file_path);
    exit;
}

// Log successful file access
error_log("File found: " . $file_path);

// Send the image if it exists
header("Content-Type: image/png");
readfile($file_path);
