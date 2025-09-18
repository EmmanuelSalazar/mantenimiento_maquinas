<?php 

    require_once __DIR__ . '/config/cors.php';
    require_once __DIR__ . '/functions/empleados.php';

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            obtenerEmpleados();
            break;
        case 'POST':
            $datos = json_decode(file_get_contents("php://input"), true);
            agregarEmpleado($datos['nombre']);
            break;
        case 'PUT':
            $datos = json_decode(file_get_contents("php://input"), true);
            actualizarEmpleado($datos);
            break;
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            eliminarEmpleado($id);
            break;
        default:
            break;
    }
?>