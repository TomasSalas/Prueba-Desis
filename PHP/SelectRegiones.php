<?php 
  require 'conexion.php';

  $sql = "SELECT * FROM Region";
  $resultado = mysqli_query($conexion, $sql);

  $regiones = array();

  if (mysqli_num_rows($resultado) > 0) {
    while($fila = mysqli_fetch_assoc($resultado)) {
      $regiones[] = $fila;
    }
  }
  
  echo json_encode($regiones);
?>