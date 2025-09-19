<?php 

    require_once __DIR__ . '/config/db/conn.php';
    require_once __DIR__ . '/config/cors.php';

    $respuesta = [
        "ok" => false,
        "respuesta" => ""
    ];   

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $maintenanceType = $data['maintenanceType'];
        $responsible = $data['responsible'];
        $observations = $data['observations'];
        $date = date('Y-m-d H:i:s');
        $machineData = $data['machineData'];
        $sql = "SELECT id FROM inventario WHERE codigo = '$machineData'";
        $result = $mysqli->query($sql);
        $row = $result->fetch_assoc();
        if($row) {
            $machineData = $row['id'];
        } else {
            $respuesta = [
                "respuesta" => "Error al guardar la intervención"
            ];
        }
        $sql = 'INSERT INTO intervenciones (emp_id, tipo, observacion, fecha, mac_id) VALUES (?, ?, ?, ?, ?)';
        if($stmt = $mysqli->prepare($sql)) {
            $stmt->bind_param('sssss', $responsible, $maintenanceType, $observations, $date, $machineData);
            if($stmt->execute()) {
                $respuesta = [
                    "ok" => true,
                    "respuesta" => "Intervención guardada"
                ];
            } else {
                $respuesta = [
                    "respuesta" => "Error al guardar la intervención"
                ];
            }
        } else {
            $respuesta = [
                "respuesta" => "Error al guardar la intervención"
            ];
        }
        echo json_encode($respuesta);

    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $codigo = $_GET['codigo'];
        $sql = "SELECT id FROM inventario WHERE codigo = '$codigo'";
        $result = $mysqli->query($sql);
        $row = $result->fetch_assoc();
        if($row) {
            $codigo = $row['id'];
        } else {
            $respuesta = [
                "reespuesta" => "Error al guardar la intervención"
            ];
        }
        $sql = 'SELECT IT.ID, IT.tipo, IT.fecha, IT.observacion, EM.nombre AS responsable FROM intervenciones IT INNER JOIN empleados EM ON IT.emp_id = EM.id WHERE IT.mac_id = ?';
        if($stmt = $mysqli->prepare($sql)) {
            $stmt->bind_param('s', $codigo);
            if($stmt->execute()) {
                $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
                $respuesta = [
                    "ok" => true,
                    "respuesta" => $result
                ];
            } else {
                $respuesta = [
                    "respuesta" => "Error al obtener las intervenciones"
                ];
            }
        } else {
            $respuesta = [
                "respuesta" => "Error al obtener las intervenciones"
            ];
        }
        echo json_encode($respuesta);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['ID'];
        $maintenanceType = $data['tipo'];
        $responsible = $data['responsable'];
        $observations = $data['observacion'];
        $sql = 'UPDATE intervenciones SET tipo = ?, observacion = ?, emp_id = ? WHERE ID = ?';
        if($stmt = $mysqli->prepare($sql)) {
            $stmt->bind_param('sssi', $maintenanceType, $observations, $responsible, $id);
            if($stmt->execute()) {
                $respuesta = [
                    "ok" => true,
                    "respuesta" => "Intervención actualizada"
                ];
            } else {
                $respuesta = [
                    "respuesta" => "Error al actualizar la intervención"
                ];
            }
        } else {
            $respuesta = [
                "respuesta" => "Error al actualizar la intervención"
            ];
        }
        echo json_encode($respuesta);
    }
?>