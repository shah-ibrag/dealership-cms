<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$db = 'dealershipDB';
$user = 'root';
$pass = 'your_password';
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
$carId = $data['id'] ?? null;

if ($carId) {
    $stmt = $pdo->prepare('
        SELECT Cars.id, make, model, price, description, Types.type, img_path
        FROM Cars 
        JOIN Types ON Cars.type_id = Types.id
        WHERE Cars.id = :id
    ');
    $stmt->execute(['id' => $carId]);
    $car = $stmt->fetch();
    header('Content-Type: application/json');
    echo json_encode($car);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Car ID is required']);
}
?>