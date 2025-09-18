<?php 
    require_once __DIR__ . '/../config/db/conn.php';
    require_once __DIR__ . '/../config/cors.php';
    $respuesta = [
        "ok" => false,
        "respuesta" => ''
    ];

    function agregarGrupo($datos){
        global $mysqli;
        $name = $datos['name'];
        $selectedMachines = json_encode($datos['selectedMachines'], JSON_UNESCAPED_UNICODE);
        $query = "INSERT INTO grupos (nombre, maquinas) VALUES ('$name', '$selectedMachines')";
        if($mysqli->query($query)){
            $respuesta['ok'] = true;
            $respuesta['respuesta'] = 'Grupo agregado';
            http_response_code(200);
            echo json_encode($respuesta);
        }else{
            $respuesta['respuesta'] = 'Error al agregar el grupo';
            http_response_code(500);
            echo json_encode($respuesta);
        }
    }
    function obtenerGrupos($grupo_id = false) {
        global $mysqli;
        global $respuesta;
        $grupo_id = $_GET['id'] ?? null;
        $i = 0;                        
        $query = "SELECT * FROM grupos";
        if($grupo_id){
            $query .= " WHERE grupo_id = $grupo_id";
        }
        if($result = $mysqli->query($query)){
            $grupo = $result->fetch_all(MYSQLI_ASSOC);
            foreach($grupo as $g){
                $grupo[$i]['maquinas'] = json_decode($g['maquinas'], true);
                $i++;
            }
            $respuesta['ok'] = true;
            $respuesta['respuesta'] = $grupo; 
            http_response_code(200);
            echo json_encode($respuesta);
        }else{
            
            $respuesta['respuesta'] = 'Error al obtener el grupo';
            http_response_code(500);
            echo json_encode($respuesta);
        }
    }
    function actualizarGrupos($datos) {
        global $mysqli;
        global $respuesta;
        $id = $datos['id'];
        $name = $datos['name'];
        $selectedMachines = json_encode($datos['selectedMachines'], JSON_UNESCAPED_UNICODE);
        $query = "UPDATE grupos SET nombre = '$name', maquinas = '$selectedMachines' WHERE grupo_id = $id";
        if($mysqli->query($query)){
            $respuesta['ok'] = true;
            $respuesta['respuesta'] = 'Grupo actualizado';
            http_response_code(200);
            echo json_encode($respuesta);
        }else{
            $respuesta['respuesta'] = 'Error al actualizar el grupo';
            http_response_code(500);
            echo json_encode($respuesta);
        }
    }
    function eliminarGrupo($id) {
        global $mysqli;
        global $respuesta;
        $query = "DELETE FROM grupos WHERE grupo_id = $id";
        if($mysqli->query($query)){
            $respuesta['ok'] = true;
            $respuesta['respuesta'] = 'Grupo eliminado';
            http_response_code(200);
            echo json_encode($respuesta);
        }else{
            $respuesta['respuesta'] = 'Error al eliminar el grupo';
            http_response_code(500);
            echo json_encode($respuesta);
        }
    }
?>