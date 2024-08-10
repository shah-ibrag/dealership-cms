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

$carId = $_GET['id'] ?? null;

if ($carId) {
    $stmt = $pdo->prepare('
        SELECT Comments.listing_id, Comments.user, Comments.comment, Comments.date
        FROM Comments
        WHERE Comments.car_id = :car_id
    ');
    $stmt->execute(['car_id' => $carId]);
    $comments = $stmt->fetchAll();
    header('Content-Type: application/json');
    echo json_encode($comments);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Car ID is required']);
}
?>