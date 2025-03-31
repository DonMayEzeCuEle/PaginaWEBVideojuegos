<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bdjuegosonline";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    // Para uso con API REST
    header("Content-Type: application/json");
    die(json_encode([
        'success' => false,
        'message' => 'Error de conexión a la base de datos: ' . $conn->connect_error
    ]));
}

// Establecer el charset
$conn->set_charset("utf8mb4");
?>