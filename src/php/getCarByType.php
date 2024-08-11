<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

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

$typeId = $_GET['id'] ?? null;

if ($typeId) {
    $stmt = $pdo->prepare('
        SELECT Cars.id, make, model, price, description, Types.type, img_path
        FROM Cars 
        JOIN Types ON Cars.type_id = Types.id
        WHERE Cars.type_id = :type_id
    ');
    $stmt->execute(['type_id' => $typeId]);
    $cars = $stmt->fetchAll();
    header('Content-Type: application/json');
    echo json_encode($cars);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Type ID is required']);
}
?>