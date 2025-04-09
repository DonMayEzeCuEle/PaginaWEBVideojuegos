<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'conexion.php';

$sql = "SELECT CAT_NOMBRE FROM CATEGORIA ORDER BY CAT_NOMBRE ASC";
$resultado = $conn->query($sql);

$categorias = [];

while ($fila = $resultado->fetch_assoc()) {
    $categorias[] = $fila['CAT_NOMBRE'];
}

header('Content-Type: application/json');
echo json_encode($categorias);

$conn->close();
?>
