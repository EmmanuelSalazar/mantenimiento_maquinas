<?php 

    require_once __DIR__ . '/config/cors.php';
    require_once __DIR__ . '/functions/grupos.php';

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            $datos = json_decode(file_get_contents("php://input"), true);
            agregarGrupo($datos);
            break;
        case 'GET':
            $grupo_id = $_GET['id'] ?? null;
                obtenerGrupos($grupo_id);
            break;
        case 'PUT':
            $datos = json_decode(file_get_contents("php://input"), true);
            actualizarGrupos($datos);
            break;
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            eliminarGrupo($id);
            break;
        default: 
            $respuesta['respuesta'] = 'Método no permitido';
            http_response_code(405);
            echo json_encode($respuesta);
            break;
    }

?>