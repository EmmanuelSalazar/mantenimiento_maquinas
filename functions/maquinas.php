<?php 
    require_once  __DIR__ . '/../config/db/conn.php';
    require_once __DIR__ . '/../config/cors.php';
function obtenerMaquinas($id = '') {
    global $mysqli;
    $id = $_GET['id'] ?? null;
        $sql = 'SELECT * FROM inventario WHERE estado = 1';
        if($id) {
            $id = $_GET['id'];
            $sql .= " AND codigo = '$id'";
        }
        if($sql = mysqli_query($mysqli, $sql)){
            $maquinas = mysqli_fetch_all($sql, MYSQLI_ASSOC);
            $respuesta = [
                'ok' => true,
                'respuesta' => $maquinas,
                'message' => 'Maquinas obtenidas'
            ];
            echo json_encode($respuesta, true);
        } else {
            $respuesta = [
                'ok' => false,
                'respuesta' => 'Error al obtener el inventario'
            ];
            echo json_encode($respuesta, true);
        }
        $mysqli->close();
}
function eliminarMaquina($id) {
    global $mysqli;
    $id = $_GET['id'] ?? null;
    $sql = "UPDATE inventario SET estado = 0 WHERE id = '$id'";
    if($mysqli->query($sql)) {
        $respuesta = [
            'ok' => true,
            'respuesta' => 'Maquina eliminada',
        ];
        echo json_encode($respuesta, true);
    } else {
        $respuesta = [
            'ok' => false,
            'respuesta' => 'Error al eliminar la maquina',
        ];
        echo json_encode($respuesta, true);
    }
}
function agregarMaquina($data) {
    global $mysqli;
    $sql = "INSERT INTO inventario (codigo, maquina, marca, serial) VALUES ('$data[codigo]', '$data[maquina]', '$data[marca]', '$data[serial]')";
    if($mysqli->query($sql)) {
        $respuesta = [
            'ok' => true,
            'respuesta' => 'Maquina agregada',
        ];
        echo json_encode($respuesta, true);
    } else {
        $respuesta = [
            'ok' => false,
            'respuesta' => 'Error al agregar la maquina',
        ];
        echo json_encode($respuesta, true);
    }
}
function actualizarMaquina($data) {
    global $mysqli;
    $sql = "UPDATE inventario SET codigo = '$data[codigo]', serial = '$data[serial]', maquina = '$data[maquina]', marca = '$data[marca]' WHERE id = '$data[id]'";
    if($mysqli->query($sql)) {
        $respuesta = [
            'ok' => true,
            'respuesta' => 'Maquina actualizada',
        ];
        echo json_encode($respuesta, true);
    } else {
        $respuesta = [
            'ok' => false,
            'respuesta' => 'Error al actualizar la maquina',
        ];
        echo json_encode($respuesta, true);
    }
}
 
?>