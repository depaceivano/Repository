<?php
require_once('../classes/db/postgre.php');
require_once('../inc/conf.inc');
session_start();

$db = new postgres(PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASSWD);
  if($db->getLastError() != "")
  {
    return;
  }

switch ($_POST['opt'])
{

  case 'home' :
                $id = $_SESSION['iduser'];
                $sql = "SELECT permission FROM common.users WHERE iduser = '".$id."'";
                $table= $db->JSON($sql);
                break;
}
?>
