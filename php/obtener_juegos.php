<?php
header('Access-Control-Allow-Origin: *'); // Permitir CORS para desarrollo
header('Content-Type: application/json');

require_once 'conexion.php'; // Asegúrate de que la ruta sea correcta

try {
    // Consulta para obtener juegos populares
    $query = "SELECT J.JUE_ID, J.JUE_TITULO, J.JUE_DESCRIPCION, J.JUE_URL, 
                     C.CAT_NOMBRE AS CATEGORIA
              FROM JUEGO J
              JOIN CATEGORIA C ON J.CAT_ID_JUEGO = C.CAT_ID
              ORDER BY J.JUE_ID
              LIMIT 8";
              
    $resultado = $conn->query($query);
    
    if (!$resultado) {
        throw new Exception("Error en la consulta: " . $conn->error);
    }
    
    $juegos = array();
    while ($fila = $resultado->fetch_assoc()) {
        // Validar que la URL tenga el formato correcto
        if (!empty($fila['JUE_URL']) && !preg_match("~^(?:f|ht)tps?://~i", $fila['JUE_URL'])) {
            $fila['JUE_URL'] = 'http://' . $fila['JUE_URL'];
        }
        $juegos[] = $fila;
    }
    
    // Devolver resultados en JSON
    echo json_encode([
        'success' => true,
        'juegos' => $juegos,
        'total' => count($juegos),
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'error_code' => $e->getCode()
    ]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>