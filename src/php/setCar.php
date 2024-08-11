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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $make = $_POST['make'] ?? null;
    $model = $_POST['model'] ?? null;
    $price = $_POST['price'] ?? null;
    $description = $_POST['description'] ?? null;
    $type_id = $_POST['type_id'] ?? null;
    $img_path = null;

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'photos/';
        $uploadFile = $uploadDir . basename($_FILES['image']['name']);
        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
            $img_path = $uploadFile;
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to upload image']);
            exit;
        }
    }

    if ($make && $model && $price && $description && $type_id && $img_path) {
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
            'img_path' => $img_path
        ]);
        http_response_code(201);
        echo json_encode(['message' => 'Car added successfully']);
    } else {
        http_response_code(400);
        echo json_encode([
            'message' => 'Invalid data',
            'errors' => [
                'make' => $make ? null : 'Make is required',
                'model' => $model ? null : 'Model is required',
                'price' => $price ? null : 'Price is required',
                'description' => $description ? null : 'Description is required',
                'type_id' => $type_id ? null : 'Type ID is required',
                'img_path' => $img_path ? null : 'Image upload failed'
            ]
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
?>