<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'conexion.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!$data) {
        throw new Exception("Datos de entrada inválidos");
    }

    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    $stmt = $conn->prepare("SELECT USU_ID, USU_NOMBRE, USU_EMAIL, USU_PASSWORD FROM USUARIO WHERE USU_EMAIL = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Correo o contraseña incorrectos']);
        exit;
    }

    $user = $result->fetch_assoc();

    if (password_verify($password, $user['USU_PASSWORD'])) {
        $response = [
            'success' => true,
            'user' => [
                'id' => $user['USU_ID'],
                'username' => $user['USU_NOMBRE'],
                'email' => $user['USU_EMAIL']
            ]
        ];
        echo json_encode($response);
    } else {
        echo json_encode(['success' => false, 'message' => 'Correo o contraseña incorrectos']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>