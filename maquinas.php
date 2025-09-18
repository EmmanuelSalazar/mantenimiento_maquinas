<?php 
    require_once __DIR__ . '/functions/maquinas.php';
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            $id = $_GET['id'] ?? null;
            obtenerMaquinas($id);
            break;
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            agregarMaquina($data);
            break;
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            actualizarMaquina($data);
            break;
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            eliminarMaquina($id);
            break;
        default:
        break;
    }
?>