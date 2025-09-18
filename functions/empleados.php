<?php 

require_once  __DIR__ . '/../config/db/conn.php';
require_once __DIR__ . '/../config/cors.php';
$respuesta = [
            "ok" => false,
            "respuesta" => "Error al obtener los empleados"
        ];
function obtenerEmpleados() {
    global $mysqli;
    $sql = 'SELECT * FROM empleados WHERE estado = 1';
        if($stmt = $mysqli->prepare($sql)) {
            if($stmt->execute()) {
                $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
                $respuesta = [
                    "ok" => true,
                    "respuesta" => $result
                ];
            } else {
                $respuesta = [
                    "respuesta" => "Error al obtener los empleados"
                ];
            }
        } else {
            $respuesta = [
                "respuesta" => "Error al obtener los empleados"
            ];
        }
        echo json_encode($respuesta);
}
function agregarEmpleado($nombre) {
    global $mysqli;
    $sql = 'INSERT INTO empleados (nombre) VALUES (?)';
    $stmt = $mysqli->prepare($sql);
    if($stmt) {
        $stmt->bind_param("s", $nombre);
        if($stmt->execute()) {
            $respuesta = [
                "ok" => true,
                "respuesta" => "Empleado agregado"
            ];
        } else {
            $respuesta = [
                "respuesta" => "Error al agregar el empleado"
            ];
        }
    } else {
        $respuesta = [
            "respuesta" => "Error al agregar el empleado"
        ];
    }
    echo json_encode($respuesta);
}
function actualizarEmpleado($datos) {
    global $mysqli;
    $sql = 'UPDATE empleados SET nombre = ? WHERE id = ?';
    $stmt = $mysqli->prepare($sql);
    if($stmt) {
        $stmt->bind_param("si", $datos['nombre'], $datos['ID']);
        if($stmt->execute()) {
            $respuesta = [
                "ok" => true,
                "respuesta" => "Empleado actualizado"
            ];
        } else {
            $respuesta = [
                "respuesta" => "Error al actualizar el empleado"
            ];
        }
    } else {
        $respuesta = [
            "respuesta" => "Error al actualizar el empleado"
        ];
    }
    echo json_encode($respuesta);
}
function eliminarEmpleado($id) {
    global $mysqli;
    $sql = 'UPDATE empleados SET estado = 0 WHERE id = ?';
    $stmt = $mysqli->prepare($sql);
    if($stmt) {
        $stmt->bind_param("i", $id);
        if($stmt->execute()) {
            $respuesta = [
                "ok" => true,
                "respuesta" => "Empleado eliminado"
            ];
        } else {
            $respuesta = [
                "respuesta" => "Error al eliminar el empleado"
            ];
        }
    } else {
        $respuesta = [
            "respuesta" => "Error al eliminar el empleado"
        ];
    }
    echo json_encode($respuesta);
}
?>