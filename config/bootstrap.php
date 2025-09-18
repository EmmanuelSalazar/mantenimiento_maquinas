<?php
require_once __DIR__ . '/./../vendor/autoload.php';

use Dotenv\Dotenv;

// Cargar variables de entorno
$baseDir = __DIR__ . '/./../';
$dotenv = Dotenv::createImmutable($baseDir);
$dotenv->load();

// Validar variables requeridas
$dotenv->required(['DB_HOST', 'DB_USERNAME', 'DB_NAME'])->notEmpty();
$dotenv->required('DB_PASSWORD'); // Puede estar vacío pero debe existir

// Configuración de zona horaria
date_default_timezone_set('America/Bogota');