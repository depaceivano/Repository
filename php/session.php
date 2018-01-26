<?php
  session_start();

  $_SESSION['iduser']     = $_POST['iduser'];
  $_SESSION['permission'] = $_POST['permission'];

?>
