<?php
// Headers para permitir CORS
header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Manejar preflight para CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'conexion.php';

// Obtener datos del POST
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Datos no recibidos']);
    exit;
}

// Validación de campos requeridos
$requiredFields = ['username', 'email', 'password'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "El campo $field es requerido"]);
        exit;
    }
}

$username = trim($data['username']);
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$password = $data['password'];

try {
    // Verificar si el email existe
    $stmt = $conn->prepare("SELECT USU_ID FROM USUARIO WHERE USU_EMAIL = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        http_response_code(409);
        echo json_encode(['success' => false, 'message' => 'El correo ya está registrado']);
        exit;
    }

    // Hash de la contraseña
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    // Insertar nuevo usuario
    $insert = $conn->prepare("INSERT INTO USUARIO (USU_NOMBRE, USU_EMAIL, USU_PASSWORD) VALUES (?, ?, ?)");
    $insert->bind_param("sss", $username, $email, $passwordHash);

    if ($insert->execute()) {
        $response = [
            'success' => true,
            'message' => 'Usuario registrado exitosamente',
            'user' => [
                'id' => $conn->insert_id,
                'username' => $username,
                'email' => $email
            ]
        ];
        echo json_encode($response);
    } else {
        throw new Exception('Error al registrar el usuario: ' . $conn->error);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} finally {
    if (isset($conn)) $conn->close();
}
?>