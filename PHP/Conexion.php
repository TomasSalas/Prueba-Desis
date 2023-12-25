<?php
  $servidor = "127.0.0.1";
  $usuario = "root";
  $password = "password";
  $base_datos = "desis";

  $conexion = mysqli_connect($servidor, $usuario, $password, $base_datos);

  if (!$conexion) {
      die("Error de conexión: " . mysqli_connect_error());
  }
?>