<?php 
    require_once __DIR__ . '/../bootstrap.php';

    $host = $_ENV['DB_HOST'] ?: 'localhost';
    $user = $_ENV['DB_USERNAME'] ?: 'root';
    $password = $_ENV['DB_PASSWORD'] ?: '';
    $dbname = $_ENV['DB_NAME'] ?: 'alt';

$mysqli = new mysqli($host, $user, $password, $dbname);
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
    mysqli_set_charset($mysqli, "utf8mb4");

?>