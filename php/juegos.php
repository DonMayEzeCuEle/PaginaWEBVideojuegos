<?php
header('Content-Type: application/json');
require_once '../conexion.php';

$category_id = isset($_GET['categoria']) ? intval($_GET['categoria']) : 0;

if ($category_id <= 0) {
    echo json_encode([]);
    exit;
}

$stmt = $conn->prepare("SELECT JUE_ID, JUE_TITULO, JUE_DESCRIPCION, JUE_URL FROM JUEGO WHERE CAT_ID_JUEGO = ?");
$stmt->bind_param("i", $category_id);
$stmt->execute();
$result = $stmt->get_result();

$games = [];
while ($row = $result->fetch_assoc()) {
    $games[] = $row;
}

echo json_encode($games);
$stmt->close();
$conn->close();
?>