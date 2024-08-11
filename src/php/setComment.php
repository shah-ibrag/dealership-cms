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

$data = json_decode(file_get_contents('php://input'), true);

$listingId = $data['listing_id'] ?? null;
$user = $data['user'] ?? null;
$comment = $data['comment'] ?? null;
$date = $data['date'] ?? null;

if ($listingId && $user && $comment && $date) {
    $stmt = $pdo->prepare('
        INSERT INTO Comments (listing_id, user, comment, date)
        VALUES (:listing_id, :user, :comment, :date)
    ');
    $stmt->execute([
        'listing_id' => $listingId,
        'user' => $user,
        'comment' => $comment,
        'date' => $date
    ]);
    http_response_code(201);
    echo json_encode(['message' => 'Comment added successfully']);
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid data']);
    
}
?>