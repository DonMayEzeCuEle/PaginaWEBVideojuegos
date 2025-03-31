<?php
header('Content-Type: application/json');
require_once '../conexion.php';

$data = json_decode(file_get_contents('php://input'), true);

$user_id = intval($data['user_id']);
$game_id = intval($data['game_id']);

// Verificar si ya existe una entrada para este usuario y juego
$stmt = $conn->prepare("SELECT REC_ID FROM RECIENTE WHERE USU_ID_RECIENTE = ? AND JUE_ID_RECIENTE = ?");
$stmt->bind_param("ii", $user_id, $game_id);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // Actualizar la fecha existente
    $update = $conn->prepare("UPDATE RECIENTE SET REC_FECHA = CURRENT_TIMESTAMP WHERE USU_ID_RECIENTE = ? AND JUE_ID_RECIENTE = ?");
    $update->bind_param("ii", $user_id, $game_id);
    $update->execute();
    $update->close();
} else {
    // Insertar nuevo registro
    $insert = $conn->prepare("INSERT INTO RECIENTE (USU_ID_RECIENTE, JUE_ID_RECIENTE) VALUES (?, ?)");
    $insert->bind_param("ii", $user_id, $game_id);
    $insert->execute();
    $insert->close();
}

echo json_encode(['success' => true]);
$stmt->close();
$conn->close();
?>