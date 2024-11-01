<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Allow CORS for all origins, adjust as needed

$host = "localhost"; // Your database host
$user = "root"; // Your database username
$password = ""; // Your database password
$dbname = "customers_db"; // Your database name

// Create connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

$searchTerm = isset($_GET['name']) ? $_GET['name'] : '';

if (!empty($searchTerm)) {
    // Update the query to include email and gstin
    $stmt = $conn->prepare("SELECT id, name, phone, email, gstin, billing_address, shipping_address,  shipping_pincode,  shipping_city, shipping_state FROM customers WHERE name LIKE ? LIMIT 10");
    $likeTerm = "%" . $searchTerm . "%";
    $stmt->bind_param("s", $likeTerm);
    $stmt->execute();
    $result = $stmt->get_result();

    $customers = [];
    while ($row = $result->fetch_assoc()) {
        $customers[] = $row; // Fetch name, phone, email, gstin
    }

    echo json_encode($customers);
} else {
    echo json_encode([]); // Return empty array if no search term is provided
}

$conn->close();
?>
