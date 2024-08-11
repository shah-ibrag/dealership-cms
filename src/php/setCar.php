<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
function cors() {
    
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
        exit(0);
    }
    
    echo "You have CORS!";
}
cors();

$host = 'localhost';
$db = 'dealershipDB';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

$data = json_decode(file_get_contents('php://input'), true);

$make = $data['make'] ?? null;
$model = $data['model'] ?? null;
$price = $data['price'] ?? null;
$description = $data['description'] ?? null;
$type_id = $data['type'] ?? null;
$photo = $_FILES['photo'] ?? null;

$error_message = '';

if ($make && $model && $price && $description && $type_id && $photo) {
    // Save the photo in a folder
    $targetDir = 'localhost/photos/'; // Replace with the actual folder path
    $targetFile = $targetDir . basename($photo['name']);
    move_uploaded_file($photo['tmp_name'], $targetFile);

    // Save the car details in the database
    $stmt = $pdo->prepare('
        INSERT INTO Cars (make, model, price, description, type_id, img_path)
        VALUES (:make, :model, :price, :description, :type_id, :img_path)
    ');
    $stmt->execute([
        'make' => $make,
        'model' => $model,
        'price' => $price,
        'description' => $description,
        'type_id' => $type_id,
        'img_path' => $targetFile
    ]);
    http_response_code(201);
    echo json_encode(['message' => 'Car added successfully']);
} else {
    if (!$make) $error_message .= 'Make is missing. ';
    if (!$model) $error_message .= 'Model is missing. ';
    if (!$price) $error_message .= 'Price is missing. ';
    if (!$description) $error_message .= 'Description is missing. ';
    if (!$type_id) $error_message .= 'Type ID is missing. ';
    if (!$img_path) $error_message .= 'Image path is missing. ';
    http_response_code(400);
    echo json_encode(['message' => 'Invalid data', 'error' => $error_message]);
}
?>