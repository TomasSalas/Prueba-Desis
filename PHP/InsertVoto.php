<?php 
  require 'conexion.php';

  $nombreApellido = isset($_POST['nombreApellido']) ? $_POST['nombreApellido'] : null;
  $alias = isset($_POST['alias']) ? $_POST['alias'] : null;
  $rut = isset($_POST['rut']) ? $_POST['rut'] : null;
  $email = isset($_POST['email']) ? $_POST['email'] : null;
  $web = isset($_POST['web']) ? $_POST['web'] : null;
  $tv = isset($_POST['tv']) ? $_POST['tv'] : null;
  $redes = isset($_POST['redes']) ? $_POST['redes'] : null;
  $amigo = isset($_POST['amigo']) ? $_POST['amigo'] : null;
  $region = isset($_POST['region']) ? $_POST['region'] : null;
  $comuna = isset($_POST['comuna']) ? $_POST['comuna'] : null;
  $candidato = isset($_POST['candidato']) ? $_POST['candidato'] : null;
  $resultado = "";

  $sql = "INSERT INTO Voto SET 
    NOMBRE_APELLIDO = '$nombreApellido',
    ALIAS = '$alias',
    RUT = '$rut',
    EMAIL = '$email',
    ID_REGION = '$region',
    ID_COMUNA = '$comuna',
    ID_CANDIDATO = '$candidato',
    WEB = " . ($web ? 1 : 0) . ",
    TV = " . ($tv ? 1 : 0) . ",
    REDES = " . ($redes ? 1 : 0) . ",
    AMIGO = " . ($amigo ? 1 : 0) .";
  ";

  $sql_rut_duplicado = "SELECT * FROM Voto WHERE RUT = '$rut'";

  $result = mysqli_query($conexion, $sql_rut_duplicado);
  
  if (mysqli_num_rows($result) > 0) {
    $resultado = "EXIST_RUT";
  }else {
    if (mysqli_query($conexion, $sql)) {
      $resultado = "INSERT_OK";
    } else {
      $resultado = "INSERT_ERROR"; 
    }
  }

  echo json_encode($resultado);
?>