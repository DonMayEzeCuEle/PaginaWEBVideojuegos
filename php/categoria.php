<?php
header('Content-Type: application/json');
require_once '../conexion.php';

$query = "SELECT CAT_ID, CAT_NOMBRE FROM CATEGORIA ORDER BY CAT_NOMBRE";
$result = $conn->query($query);

$categories = [];
while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}

echo json_encode($categories);
$conn->close();
?>