<?php 
$data = $_POST;
$percent = 10;
$daysMonth = 30;
$daysYear = 368;

$result = $data["sum"] + ($data["sumadd"] + ($data["sumadd"] * $data["calculator-radio"])) * $daysMonth * ($percent / $daysYear);

  echo ceil($result);
?>
