<?php
// CONFIGURACIÓN DE ENTORNO
require __DIR__ . '/vendor/autoload.php';
use Dotenv\Dotenv;
$baseDir = __DIR__;
$dotenv = Dotenv::createImmutable($baseDir);
$dotenv->load();
$dotenv->required(['DB_HOST', 'DB_USERNAME', 'DB_NAME'])->notEmpty();
require_once __DIR__ . '/config/db/conn.php';

echo 'Tu no deberías estar aqui';

?>