<?php 
  require 'conexion.php';

  $sql = "SELECT * FROM Candidato";
  $resultado = mysqli_query($conexion, $sql);

  $candidato = array();

  if (mysqli_num_rows($resultado) > 0) {
    while($fila = mysqli_fetch_assoc($resultado)) {
      $candidato[] = array(
        "ID_CANDIDATO" => $fila["ID_CANDIDATO"], 
        "NOMBRE" => $fila["NOMBRE"] . " " . $fila["APELLIDO"]
      );
    }
  }
  
  echo json_encode($candidato);
?>