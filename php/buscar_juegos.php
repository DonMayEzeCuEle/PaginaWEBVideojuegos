<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$busqueda = $_GET['query'] ?? '';

$query = "SELECT * FROM JUEGO WHERE JUE_TITULO LIKE ?";
$stmt = $conn->prepare($query);
$like = "$busqueda%";
$stmt->bind_param("s", $like);
$stmt->execute();

$result = $stmt->get_result();
$juegos = [];

while ($row = $result->fetch_assoc()) {
    // Usamos el ID para formar la ruta de la imagen (como ya están nombradas)
    $imagen = "Imagenes/Juegos/Juego" . $row['JUE_ID'] . ".png";

    $juegos[] = [
        'titulo' => $row['JUE_TITULO'],
        'descripcion' => $row['JUE_DESCRIPCION'],
        'url' => $row['JUE_URL'],
        'imagen' => $imagen
    ];
}

echo json_encode($juegos);
$conn->close();
?>
