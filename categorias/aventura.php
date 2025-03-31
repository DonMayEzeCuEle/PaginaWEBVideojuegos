<?php
require_once '../php/conexion.php';

// Obtener nombre de categoría desde la URL
$categoria_nombre = 'Aventura'; // Esto debería ser dinámico en producción

// Consulta para obtener juegos de esta categoría
$query = "SELECT j.* FROM JUEGO j 
          JOIN CATEGORIA c ON j.CAT_ID_JUEGO = c.CAT_ID 
          WHERE c.CAT_NOMBRE = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $categoria_nombre);
$stmt->execute();
$juegos = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Juegos de <?= $categoria_nombre ?> | ISOF GAMES</title>
    <link rel="stylesheet" href="../CSS/juegos.css">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&family=Luckiest+Guy&display=swap" rel="stylesheet">
</head>
<body>
    <?php include '../header.php'; ?>

    <div class="games-section">
        <button onclick="window.history.back()" class="back-button">
            ← Volver
        </button>
        
        <h1 class="category-title"><?= $categoria_nombre ?></h1>
        
        <div class="games-grid">
            <?php foreach ($juegos as $juego): ?>
                <div class="game-card">
                    <img src="../<?= htmlspecialchars($juego['JUE_URL']) ?>" 
                         alt="<?= htmlspecialchars($juego['JUE_TITULO']) ?>" 
                         class="game-image">
                    <div class="game-info">
                        <h3 class="game-title"><?= htmlspecialchars($juego['JUE_TITULO']) ?></h3>
                        <p class="game-time">5m</p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <?php include '../footer.php'; ?>
</body>
</html>