<?php
header('Content-Type: application/json');
require_once '../conexion.php';

$game_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($game_id <= 0) {
    echo json_encode(['error' => 'ID de juego inválido']);
    exit;
}

$stmt = $conn->prepare("SELECT JUE_ID, JUE_TITULO, JUE_DESCRIPCION, JUE_URL FROM JUEGO WHERE JUE_ID = ?");
$stmt->bind_param("i", $game_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['error' => 'Juego no encontrado']);
    exit;
}

echo json_encode($result->fetch_assoc());
$stmt->close();
$conn->close();
?>