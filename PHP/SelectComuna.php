<?php 
  require 'conexion.php';

  $id_region = isset($_POST['id_region']) ? $_POST['id_region'] : null;

  $sql = "SELECT * FROM Comuna WHERE ID_REGION = '$id_region'";
  $resultado = mysqli_query($conexion, $sql);


  $comunas = array();

  if (mysqli_num_rows($resultado) > 0) {
    while($fila = mysqli_fetch_assoc($resultado)) {
      $comunas[] = $fila;
    }
  }
  
  echo json_encode($comunas);
?>